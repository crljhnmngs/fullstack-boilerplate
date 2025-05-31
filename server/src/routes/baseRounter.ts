import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
    res.send({ status: 'OK', version: 'v1' });
};
