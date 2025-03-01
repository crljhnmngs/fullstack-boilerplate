import { Request, Response } from 'express';
import { getAllSales } from '../services/saleService';

export const getSales = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = (req.query.search as string) || '';

        const { sales, total } = await getAllSales(page, limit, search);

        res.status(200).json({
            data: sales,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                perPage: limit,
            },
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch sales' });
    }
};
