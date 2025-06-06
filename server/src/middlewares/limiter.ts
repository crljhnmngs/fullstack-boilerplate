import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { keys } from '../config/keys';

const formatRateLimitResponse = (
    req: Request,
    res: Response,
    customMessage: string
) => {
    console.warn(`Rate limit exceeded: ${req.ip} - ${req.originalUrl}`);

    return res.status(429).json({
        success: false,
        data: null,
        message: 'Too Many Requests',
        error: {
            code: 429,
            message: customMessage,
            retryAfter: `${Math.ceil(Number(res.getHeader('Retry-After')) || 60)} seconds`,
            timestamp: new Date().toISOString(),
        },
    });
};

const limiter = rateLimit({
    windowMs: Number(keys.limiter.windowsMS) || 60_000, // Default: 1 minute
    max: Number(keys.limiter.maxRequest || 100), // Default: 100 requests per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: (req: Request, res: Response) =>
        formatRateLimitResponse(
            req,
            res,
            'Too many requests, please try again later.'
        ),
});

export default limiter;

export const loginLimiter = rateLimit({
    windowMs: 60_000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req: Request, res: Response) =>
        formatRateLimitResponse(
            req,
            res,
            'Too many login attempts, please try again later.'
        ),
});

export const confirmEmailLimiter = rateLimit({
    windowMs: 60_000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req: Request, res: Response) =>
        formatRateLimitResponse(
            req,
            res,
            'Too many confirmation attempts, please try later.'
        ),
});

export const forgotPasswordLimiter = rateLimit({
    windowMs: 60_000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req: Request, res: Response) =>
        formatRateLimitResponse(
            req,
            res,
            'Too many password reset attempts, please try again later.'
        ),
});
