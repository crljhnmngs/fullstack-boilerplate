import { Request, Response, NextFunction } from 'express';

/* eslint-disable */
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Unhandled error:', err);

    const statusCode = err.status || 500;
    const message =
        err.message ||
        'Something went wrong on our end. Please try again later.';

    const summary =
        statusCode === 400
            ? 'Bad Request'
            : statusCode === 401
              ? 'Unauthorized'
              : statusCode === 403
                ? 'Forbidden'
                : statusCode === 404
                  ? 'Not Found'
                  : statusCode === 500
                    ? 'Server Error'
                    : 'Error';

    res.status(statusCode).json({
        success: false,
        data: null,
        message: summary,
        error: {
            code: statusCode,
            message,
            timestamp: new Date().toISOString(),
        },
    });
};
