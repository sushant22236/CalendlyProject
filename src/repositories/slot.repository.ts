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

export async function upsertAvailableSlot(hostId: number, eventTypeId: number, startAt: Date, endAt: Date) {
    return await prisma.slot.upsert({
        where: {
            eventTypeId_startAt_endAt: {
                eventTypeId,
                startAt,
                endAt,
            }
        },
        create: {
            hostId,
            eventTypeId,
            startAt,
            endAt,
            status: 'AVAILABLE',
        },
        update: {
            status: 'AVAILABLE',
        }
    });
}