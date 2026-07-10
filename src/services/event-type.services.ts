import { create, findByHostId, getById, update, remove } from '../repositories/event-type.respositories';
import { notFound } from '../utils/api.error';
import { CreateEventTypeDto, UpdateEventTypeDto } from '../dtos/event-type.dto';

export async function getEventTypesByHostId(hostId: number) {
    const eventTypes = await findByHostId(hostId);
    return eventTypes;
}

export async function getEventTypeById(id: number) {
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found');
    }
    return eventType;
}

export async function createEventType(hostId: number, data: CreateEventTypeDto) {
    const eventType = await create(hostId, data);
    return eventType;
}

export async function updateEventType(id: number, data: UpdateEventTypeDto) {
    const eventType = await update(id, data);
    if (!eventType) {
        throw notFound('Event type not found');
    }
    return eventType;
}

export async function deleteEventType(id: number) {
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found');
    }
    const deletedEventType = await remove(id);
    return deletedEventType;
}