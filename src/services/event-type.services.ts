import { create, findByHostId, getById, update, remove, slugExistForHost, findByHostAndSlug } from '../repositories/event-type.respositories';
import { conflict, forbidden, notFound } from '../utils/api.error';
import { CreateEventTypeDto, UpdateEventTypeDto } from '../dtos/event-type.dto';
import slug from "slug";
import { getUserById } from './user.services';

export async function getEventTypesByHostId(hostId: number) {
    const eventTypes = await findByHostId(hostId);
    return eventTypes;
}


export async function createEventType(hostId: number, data: CreateEventTypeDto) {
    const slugPassed = data.slug ?? slug(data.title, {lower: true});
    if(!slugPassed){
        throw conflict('Slug is required for event type');
    }

    const isSlugTaken = await slugExistForHost(hostId, slugPassed);
    if (isSlugTaken) {
        throw conflict('Slug already exists for this host, plase use a different slug');
    }

    return create(hostId, {...data, slug: slugPassed});
}

export async function updateEventType(id: number, data: UpdateEventTypeDto) {
    const eventType = await update(id, data);
    if (!eventType) {
        throw notFound('Event type not found');
    }
    return eventType;
}

export async function deleteEventType(hostId: number, id: number) {
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found');
    }

    if (eventType.hostId !== hostId) {
        throw forbidden('You are not authorized to delete this event type');
    }

    const deletedEventType = await remove(id);
    return deletedEventType;
}

export async function getEventByPublic(hostId: number, slug: string) {
    const eventType = await findByHostAndSlug(hostId, slug);
    if (!eventType) {
        throw notFound('Event type not found');
    }

    const host = await getUserById(hostId);
    if (!host) {
        throw notFound('Host not found'); // Host is not active or does not exist
    }

    return{
        eventType: {
            id: eventType.id,
            title: eventType.title,
            description: eventType.description,
            durationMinutes: eventType.durationMinutes,
            locationType: eventType.locationType,
        },
        host: {
            name: host.name,
            email: host.email,
        }
    }
}