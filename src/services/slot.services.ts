import { DateTime } from "luxon";
import { SLOT_GENERATION_DAYS } from "../config/env.js";
import { getActiveByUserId as getActiveRulesByUser, findExceptionsByUserInRange } from "../repositories/availability.repository.js";
import { findActiveEventByHost } from "../repositories/event-type.repository.js";
import { findBookedSlotsByHostInRange, upsertAvailableSlotsBulk } from "../repositories/slot.repository.js";
import { getById as getUserById } from "../repositories/user.repository.js";
import { applyExceptionsForDate, overlapsBooked, splitIntoSlots, TimeWindow, windowsForWeekdayRule } from "./slot-generation.services.js";

export interface RegenerateHostSlotsInput {
    hostId: number;
    from?: string; // YYYY-MM-DD
    to?: string; // YYYY-MM-DD
}

export async function RegenerateHostSlotsInput(input: RegenerateHostSlotsInput) {
    const host = await getUserById(input.hostId);
    if (!host) return;

    const from = input.from
        ? DateTime.fromISO(input.from, { zone: 'utc' }).startOf('day') // 2026-06-01 -> 2026-06-01T00:00:00:000Z
        : DateTime.now().startOf('day');

    const to = input.to
        ? DateTime.fromISO(input.to, { zone: 'utc' }).endOf('day') // 2026-06-01 -> 2026-06-01T23:59:59:999Z
        : from.plus({ days: SLOT_GENERATION_DAYS }).endOf('day');


    const [rules, exceptions, eventTypes, bookedSlots] = await Promise.all([
        getActiveRulesByUser(input.hostId),
        findExceptionsByUserInRange(input.hostId, from.toJSDate(), to.toJSDate()),
        findActiveEventByHost(input.hostId),
        findBookedSlotsByHostInRange(input.hostId, from.toJSDate(), to.toJSDate()),
    ]);

    // convert booked slots into time windows -> compatible with luxon
    const bookedWindows: TimeWindow[] = bookedSlots.map((slot) => {
        return {
            start: DateTime.fromJSDate(slot.startAt, { zone: 'utc' }),
            end: DateTime.fromJSDate(slot.endAt, { zone: 'utc' }),
        }
    });

    const slotsToUpsert: { eventTypeId: number, startAt: Date, endAt: Date }[] = [];

    for (const eventType of eventTypes) {

        for (let cursor = from; cursor <= to; cursor = cursor.plus({ days: 1 })) {
            const dateKey = cursor.toISODate(); // 2026-06-01

            const dayExceptions = exceptions.filter((ex) => DateTime.fromJSDate(ex.date, { zone: 'utc' }).toISODate() === dateKey);
            const dayExceptionsWithTimeZone = dayExceptions.map((ex) => ({
                type: ex.type,
                startTime: ex.startTime,
                endTime: ex.endTime,
                timeZone: ex.timezone,
            }));


            let windows: TimeWindow[] = [];

            // convert rules into time windows -> compatible with luxon
            for (const rule of rules) {
                windows.push(...windowsForWeekdayRule(cursor, rule.weekday, rule.startTime, rule.endTime, rule.timezone));
            }

            // apply exceptions to the windows
            windows = applyExceptionsForDate(cursor, windows, dayExceptionsWithTimeZone);

            const slots = splitIntoSlots(
                windows, // windows on which exceptions are applied
                eventType.durationMinutes,
                eventType.bufferBeforeMinutes,
                eventType.bufferAfterMinutes,
            ).filter(
                (slot) => slot.start > DateTime.utc() && !overlapsBooked(slot, bookedWindows, eventType.bufferBeforeMinutes, eventType.bufferAfterMinutes)
            ); // slots filtered to exclude past slots and slots that overlap with booked slots

            // I dont like this query too much.
            for (const slot of slots) {
                const startAt = slot.start.toUTC().toJSDate();
                const endAt = slot.end.toUTC().toJSDate();

                slotsToUpsert.push({
                    eventTypeId: eventType.id,
                    startAt,
                    endAt
                });
            }
        }


    }

    if (slotsToUpsert.length > 0) {
        await upsertAvailableSlotsBulk(input.hostId, slotsToUpsert);
    }

}