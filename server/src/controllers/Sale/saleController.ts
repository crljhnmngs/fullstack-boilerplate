import { Request, Response } from 'express';
import { getAllSales } from '../../services/Sale/saleService';

export const getSales = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = (req.query.search as string) || '';
        const couponUsed = req.query.couponUsed
            ? req.query.couponUsed === 'true'
            : undefined;
        const purchaseMethod = req.query.purchaseMethod as string | undefined;

        const { sales, total } = await getAllSales(
            page,
            limit,
            search,
            couponUsed,
            purchaseMethod
        );

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
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(400).json({ error: 'Failed to fetch sales' });
    }
};
