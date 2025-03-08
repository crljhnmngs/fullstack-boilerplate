import { Request, Response } from 'express';
import {
    getAllSalesService,
    createSaleService,
    updateSaleService,
} from '../../services/Sale/saleService';

export const getSales = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = (req.query.search as string) || '';
        const couponUsed = req.query.couponUsed
            ? req.query.couponUsed === 'true'
            : undefined;
        const purchaseMethod = req.query.purchaseMethod as string | undefined;

        const { sales, total } = await getAllSalesService(
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

export const addSale = async (req: Request, res: Response) => {
    try {
        const saleData = req.body;
        const newSale = await createSaleService(saleData);

        res.status(201).json({ data: newSale });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(400).json({ error: 'Failed to add sale' });
    }
};

export const updateSale = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedSale = await updateSaleService(id, req.body);

        if (!updatedSale) {
            res.status(404).json({ error: 'Sale not found' });
            return;
        }

        res.status(200).json(updatedSale);
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
