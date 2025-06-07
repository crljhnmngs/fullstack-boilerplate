import { Request, Response, NextFunction } from 'express';

/* eslint-disable */
export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`Cannot ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        data: null,
        message: 'Not Found',
        error: {
            code: 404,
            message: 'The requested resource was not found.',
            timestamp: new Date().toISOString(),
        },
    });
};
