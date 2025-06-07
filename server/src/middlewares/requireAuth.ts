import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { keys } from '../config/keys';
import { User } from '../models/User/users';

export const requireAuth = async (
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Authentication Required',
            error: {
                code: 401,
                message: 'No token provided',
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, keys.app.JWTSecret) as jwt.JwtPayload;

        const user = await User.findById(decoded.userId);

        if (!user) {
            res.status(404).json({
                success: false,
                data: null,
                message: 'User not found',
                error: {
                    code: 404,
                    message: 'User does not exist',
                    timestamp: new Date().toISOString(),
                },
            });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error('Authentication error:', error);

        res.status(401).json({
            success: false,
            data: null,
            message: 'Authentication Failed',
            error: {
                code: 401,
                message: 'Invalid or expired token',
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }
};
