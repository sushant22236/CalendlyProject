import { Request, Response } from 'express';
import { 
    listRules, createRule, updateRule, removeRule,
    listExceptions, createException, updateException, removeException
} from "../services/availability.services";
import { sendSuccess } from '../utils/api.response';

// --- Availability Rules ---

export async function listRulesController(req: Request, res: Response) {
    const rules = await listRules(req.userId);
    sendSuccess(res, rules);
}

export async function createRuleController(req: Request, res: Response) {
    const rule = await createRule(req.userId, req.body);
    sendSuccess(res, rule, 201, "Availability rule created successfully");
}

export async function updateRuleController(req: Request, res: Response) {
    const { id } = req.params;
    const rule = await updateRule(Number(id), req.userId, req.body);
    sendSuccess(res, rule, 200, "Availability rule updated successfully");
}

export async function removeRuleController(req: Request, res: Response) {
    const { id } = req.params;
    const rule = await removeRule(req.userId, Number(id));
    sendSuccess(res, rule, 200, "Availability rule deleted successfully");
}

// --- Availability Exceptions ---

export async function listExceptionsController(req: Request, res: Response) {
    const exceptions = await listExceptions(req.userId);
    sendSuccess(res, exceptions);
}

export async function createExceptionController(req: Request, res: Response) {
    const exception = await createException(req.userId, req.body);
    sendSuccess(res, exception, 201, "Availability exception created successfully");
}

export async function updateExceptionController(req: Request, res: Response) {
    const { id } = req.params;
    const exception = await updateException(Number(id), req.userId, req.body);
    sendSuccess(res, exception, 200, "Availability exception updated successfully");
}

export async function removeExceptionController(req: Request, res: Response) {
    const { id } = req.params;
    const exception = await removeException(req.userId, Number(id));
    sendSuccess(res, exception, 200, "Availability exception deleted successfully");
}
