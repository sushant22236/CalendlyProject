import { Router } from 'express';
import { getPublicEventController } from '../controller/event-type.controllers'

const router = Router();

router.get('/users/:userId/event-types/:slug', getPublicEventController);

export default router;

