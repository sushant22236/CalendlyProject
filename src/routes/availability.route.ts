import Router from 'express';
import { requireUserId } from '../middlewares/require-user-id';
import { validate } from '../middlewares/validate';
import {
    createAvailabilityRuleSchema, updateAvailabilityRuleSchema,
    createAvailabilityExceptionSchema, updateAvailabilityExceptionSchema
} from '../dtos/availability.dto';
import {
    listRulesController, createRuleController, updateRuleController, removeRuleController,
    listExceptionsController, createExceptionController, updateExceptionController, removeExceptionController
} from '../controller/availability.controllers';

const router = Router();

// Availability Rules Routes
router.get('/rules', requireUserId, listRulesController);
router.post('/rules', requireUserId, validate(createAvailabilityRuleSchema), createRuleController);
router.patch('/rules/:id', requireUserId, validate(updateAvailabilityRuleSchema), updateRuleController);
router.delete('/rules/:id', requireUserId, removeRuleController);

// Availability Exceptions Routes
router.get('/exceptions', requireUserId, listExceptionsController);
router.post('/exceptions', requireUserId, validate(createAvailabilityExceptionSchema), createExceptionController);
router.patch('/exceptions/:id', requireUserId, validate(updateAvailabilityExceptionSchema), updateExceptionController);
router.delete('/exceptions/:id', requireUserId, removeExceptionController);

export default router;
