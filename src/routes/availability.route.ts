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
router.get('/availability/rules', requireUserId, listRulesController);
router.post('/availability/rules', requireUserId, validate(createAvailabilityRuleSchema), createRuleController);
router.patch('/availability/rules/:id', requireUserId, validate(updateAvailabilityRuleSchema), updateRuleController);
router.delete('/availability/rules/:id', requireUserId, removeRuleController);

// Availability Exceptions Routes
router.get('/availability/exceptions', requireUserId, listExceptionsController);
router.post('/availability/exceptions', requireUserId, validate(createAvailabilityExceptionSchema), createExceptionController);
router.patch('/availability/exceptions/:id', requireUserId, validate(updateAvailabilityExceptionSchema), updateExceptionController);
router.delete('/availability/exceptions/:id', requireUserId, removeExceptionController);

export default router;
