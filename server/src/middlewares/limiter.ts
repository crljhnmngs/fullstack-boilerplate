import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { keys } from '../config/keys';

const limiter = rateLimit({
    windowMs: Number(keys.limiter.windowsMS) || 60_000, // Default: 1 minute
    max: Number(keys.limiter.maxRequest || 100), // Default: 100 requests per IP
    standardHeaders: true, // Include `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    message: (req: Request, res: Response) => {
        console.warn(`Rate limit exceeded: ${req.ip} - ${req.originalUrl}`);

        return res.status(429).json({
            error: 'Too many requests, please try again later.',
            status: 429,
            retryAfter: `${Math.ceil(Number(res.getHeader('Retry-After')) || 60)} seconds`,
            timestamp: new Date().toISOString(),
        });
    },
});

export default limiter;
