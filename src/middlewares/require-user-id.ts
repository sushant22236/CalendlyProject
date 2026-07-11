import { Request, Response, NextFunction } from "express";
import { badRequest, unauthorized } from "../utils/api.error";

export function requireUserId(req: Request, _res: Response, next: NextFunction) {

    const userIdHeader = req.headers['x-user-id'];

    if (!userIdHeader || Array.isArray(userIdHeader) || typeof userIdHeader !== 'string') {
        throw unauthorized('User ID is required in the header');
    }

    const userId = Number(userIdHeader);
    if (Number.isNaN(userId)) {
        throw badRequest('User ID must be a valid number');
    }

    req.userId = userId;
    next();
}