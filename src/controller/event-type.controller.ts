import { getEventTypesByHostId, getEventTypeById, createEventType, updateEventType, deleteEventType, getEventByPublic } from '../services/event-type.services';
import { Request, Response } from 'express';
import {sendSuccess} from '../utils/api.response'

export async function getEventByHostIdController(req: Request, res: Response) {
    const eventTypes = await getEventTypesByHostId(req.userId);
    sendSuccess(res, eventTypes);
}

export async function getEventByIdController(req: Request, res: Response) {
    const {id} = req.params;
    const eventType = await getEventTypeById(Number(id), req.userId);
    sendSuccess(res, eventType);
}

export async function createEventController(req: Request, res: Response) {
    const eventType = await createEventType(req.userId, req.body);
    sendSuccess(res, eventType, 201, 'Event type created successfully');
}

export async function updateEventController(req: Request, res: Response) {
    const {id} = req.params;
    const eventType = await updateEventType(req.userId, Number(id), req.body);
    sendSuccess(res, eventType, 200, 'Event type updated successfully');
}

export async function deleteEventController(req: Request, res: Response) {
    const {id} = req.params;
    const deletedEventType = await deleteEventType(req.userId, Number(id));
    sendSuccess(res, deletedEventType, 200, 'Event type deleted successfully');
}

export async function getPublicEventController(req: Request, res: Response) {
    const {hostId, slug} = req.params;
    const eventType = await getEventByPublic(Number(userId), String(slug));
    sendSuccess(res, eventType);
}




