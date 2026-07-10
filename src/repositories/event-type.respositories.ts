import {prisma} from '../config/database'
import {CreateEventTypeDto, UpdateEventTypeDto} from '../dtos/event-type.dto'

export async function findByHostId(hostId: number) {
    const eventTypes = await prisma.eventType.findMany({
        where: {hostId},
        orderBy: {createdAt: 'desc'},
    });
    return eventTypes;
}

export async function getById(id: number) {
    const eventType = await prisma.eventType.findUnique({
        where: {id},
    });
    return eventType;
}

export async function create(hostId: number, data: CreateEventTypeDto) {
    const eventType = await prisma.eventType.create({
        data: {
            ...data,
            hostId
        }
    });
    return eventType;
}

export async function update(id: number, data: UpdateEventTypeDto){
    const eventType = await prisma.eventType.update({
        where: {id},
        data
    });
    return eventType;
} 

export async function remove(id: number){
    const eventType = await prisma.eventType.delete({
        where: {id}
    });
    return eventType;
}

export async function findByHostAndSlug(hostId: number, slug: string) {
    const eventType = await prisma.eventType.findFirst({
        where: {
            hostId,
            slug
        }
    });
    return eventType;
}

