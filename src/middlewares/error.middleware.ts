import { Request, Response, NextFunction } from "express";

export function errorHandler(_err: Error, _req: Request, res: Response, _next: NextFunction) {
    res.json({message: "something went wrong",})
}
