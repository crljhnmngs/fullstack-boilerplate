import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User/users';

export const requireRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId;

        try {
            if (!userId) {
                res.status(401).json({
                    success: false,
                    data: null,
                    message: 'Authentication Failed',
                    error: {
                        code: 401,
                        message:
                            'You must be logged in to access this resource.',
                        timestamp: new Date().toISOString(),
                    },
                });
                return;
            }

            const user = await User.findById(userId);

            if (!user) {
                res.status(404).json({
                    success: false,
                    data: null,
                    message: 'User not found',
                    error: {
                        code: 404,
                        message:
                            'The user associated with this token does not exist.',
                        timestamp: new Date().toISOString(),
                    },
                });
                return;
            }

            if (!roles.includes(user.role)) {
                res.status(403).json({
                    success: false,
                    data: null,
                    message: 'Access denied',
                    error: {
                        code: 403,
                        message: `Access denied: role '${user.role}' is not permitted to access this resource.`,
                        timestamp: new Date().toISOString(),
                    },
                });
                return;
            }

            next();
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(500).json({
                success: false,
                data: null,
                message: 'Internal server error',
                error: {
                    code: 500,
                    message:
                        'Something went wrong on our end. Please try again later.',
                },
            });
            return;
        }
    };
};
