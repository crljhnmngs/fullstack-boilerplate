import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: {
            status: 'OK',
            version: 'v1',
        },
        message: 'Health check successful',
        error: null,
    });
};
