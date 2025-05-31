import { Request, Response, NextFunction } from 'express';

/* eslint-disable */
export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
        status: 404,
        timestamp: new Date().toISOString(),
    });
};
