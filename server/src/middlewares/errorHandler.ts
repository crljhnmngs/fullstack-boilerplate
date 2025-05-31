import { Request, Response, NextFunction } from 'express';

/* eslint-disable */
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Unhandled error:', err);

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        status: err.status || 500,
        timestamp: new Date().toISOString(),
    });
};
