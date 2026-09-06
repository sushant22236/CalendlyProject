import Router from 'express';
import { requireUserId } from '../middlewares/require-user-id';
import { getEventByHostIdController, getEventByIdController, createEventController, updateEventController, deleteEventController, getPublicEventController } from '../controller/event-type.controllers';
import { validate } from '../middlewares/validate';
import { createEventTypeSchema, updateEventTypesSchema } from '../dtos/event-type.dto';
const router = Router();

router.get('/events', requireUserId, getEventByHostIdController);
router.get('/events/:id', requireUserId, getEventByIdController);
router.post('/events', requireUserId, validate(createEventTypeSchema), createEventController);
router.patch('/events/:id', requireUserId, validate(updateEventTypesSchema), updateEventController);
router.delete('/events/:id', requireUserId, deleteEventController);

export default router;
