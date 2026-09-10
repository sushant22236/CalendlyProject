import { prisma } from '../config/database';

export async function findBookedSlotsByHostInRange(hostId: number, startDate: Date, endDate: Date) {
    const slots = await prisma.slot.findMany({
        where: {
            hostId,
            startAt: {
                gte: startDate,
                lte: endDate
            },
            status: 'BOOKED'
        }
    });
    return slots;
}

export async function upsertAvailableSlotsBulk(
    hostId: number,
    slots: { eventTypeId: number; startAt: Date; endAt: Date }[]
) {
    if (slots.length === 0) return;

    const upserts = slots.map((slot) =>
        prisma.slot.upsert({
            where: {
                eventTypeId_startAt_endAt: {
                    eventTypeId: slot.eventTypeId,
                    startAt: slot.startAt,
                    endAt: slot.endAt,
                },
            },
            create: {
                hostId,
                eventTypeId: slot.eventTypeId,
                startAt: slot.startAt,
                endAt: slot.endAt,
                status: 'AVAILABLE',
            },
            update: {
                status: 'AVAILABLE',
            },
        })
    );

    return await prisma.$transaction(upserts);
}