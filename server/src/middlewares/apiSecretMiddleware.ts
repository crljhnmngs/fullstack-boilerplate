import { Request, Response, NextFunction } from 'express';
import { keys } from '../config/keys';

const apiSecretMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const apiSecret = req.headers['x-api-secret'] as string;
    const validSecret = keys.app.apiSecret;

    if (!apiSecret || apiSecret !== validSecret) {
        res.status(403).json({
            success: false,
            data: null,
            message: 'Forbidden',
            error: {
                code: 403,
                message: 'You do not have permission to access this resource',
            },
        });
        return;
    }

    next();
};

export default apiSecretMiddleware;
