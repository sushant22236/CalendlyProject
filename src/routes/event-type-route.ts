import Router from 'express';
import { requireUserId } from '../middlewares/require-user-id';
import { getEventByHostIdController, getEventByIdController, createEventController, updateEventController, deleteEventController, getPublicEventController } from '../controller/event-type.controller';

const router = Router();

router.get('/host', requireUserId, getEventByHostIdController);
router.get('/host/:id', requireUserId, getEventByIdController);
router.post('/host', requireUserId, createEventController);
router.put('/host/:id', requireUserId, updateEventController);
router.delete('/host/:id', requireUserId, deleteEventController);