import { Response } from 'express';

interface sucessPayload <T> {
    success: true;
    data: T;
    mesage?: string;
}

export function sendSuccess<T>(res: Response, data: T, stausCode = 200, message?: string) : void {
    const body: sucessPayload<T> = {
        success: true,
        data,
    };

    if(message) body.mesage = message;
    res.status(stausCode).json(body);
}