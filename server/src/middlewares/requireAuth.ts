import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { keys } from '../config/keys';
import { User } from '../models/User/users';

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, keys.app.JWTSecret) as jwt.JwtPayload;

        const user = await User.findById(decoded.userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
