import { Request, Response } from 'express';
import { getEventByHostId, getEventById, createEvent, updateEvent, deleteEvent, getEventPublic } from "../services/event-type.services";
import { sendSuccess } from '../utils/api.response';

export async function getEventByHostIdController(req: Request, res: Response) {
    const eventTypes = await getEventByHostId(req.userId)
    sendSuccess(res, eventTypes)
}

export async function getEventByIdController(req: Request, res: Response) {
    const { id } = req.params
    const eventTypes = await getEventById(Number(id), req.userId)
    sendSuccess(res, eventTypes)
}

export async function createEventController(req: Request, res: Response) {
    const eventTypes = await createEvent(req.userId, req.body)
    sendSuccess(res, eventTypes, 200, "event type created successfully");
}

export async function updateEventController(req: Request, res: Response) {
    const { id } = req.params
    const eventTypes = await updateEvent(Number(id), req.userId, req.body)
    sendSuccess(res, eventTypes, 200, "event type updated successfully");
}

export async function deleteEventController(req: Request, res: Response) {
    const { id } = req.params
    const eventTypes = await deleteEvent(Number(id), req.userId)
    sendSuccess(res, eventTypes, 200, "event type deleted successfully");
}

export async function getPublicEventController(req: Request, res: Response) {
    const { userId, slug } = req.params
    const eventTypes = await getEventPublic(Number(userId), String(slug))
    sendSuccess(res, eventTypes)
}


