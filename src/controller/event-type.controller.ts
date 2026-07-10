import { getEventTypesByHostId, getEventTypeById, createEventType, updateEventType, deleteEventType } from '../services/event-type.services';
import { Request, Response } from 'express';
import {sendSuccess} from '../utils/api.response'

export async function getEventByHostIdController(req: Request, res: Response) {
    const hostId = parseInt(req.params.hostId);
    const eventTypes = await getEventTypesByHostId(hostId);
    sendSuccess(res, eventTypes);
}

export async function getEventTypeByIdController(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const eventType = await getEventTypeById(id);
    sendSuccess(res, eventType);
}

export async function createEventTypeController(req: Request, res: Response) {
    const hostId = parseInt(req.params.hostId);
    const eventType = await createEventType(hostId, req.body);
    sendSuccess(res, eventType, 201, 'Event type created successfully');
}

export async function updateEventTypeController(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const eventType = await updateEventType(id, req.body);
    sendSuccess(res, eventType, 200, 'Event type updated successfully');
}

export async function deleteEventTypeController(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const deletedEventType = await deleteEventType(id);
    sendSuccess(res, deletedEventType, 200, 'Event type deleted successfully');
}




