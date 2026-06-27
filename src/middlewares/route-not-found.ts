import { Request, Response, NextFunction } from 'express';
import { notFound } from '../utils/api.error';

export function routeNotFound(req: Request, _res: Response, next: NextFunction) {
    next(notFound(`Route ${req.originalUrl} not found`));
}