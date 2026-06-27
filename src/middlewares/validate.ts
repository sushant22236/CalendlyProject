import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { badRequest } from '../utils/api.error';

export const validate = (schema: z.ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            throw badRequest("Validation failed", result.error.issues);
        }

        //if the validate passes

        req.body = result.data; // assign the validated data back to req.body

        next(); // calling the controller with validate data
        
    };
}