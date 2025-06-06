import { Request, Response } from 'express';
import {
    getAllSalesService,
    createSaleService,
    updateSaleService,
    deleteSaleService,
    deleteMultipleSalesService,
} from '../../services/Sale/saleService';
import { saleSchema } from '../../utils/validation/Sale/saleValidation';

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
            success: true,
            data: sales,
            message: 'Sales retrieved successfully!',
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                perPage: limit,
            },
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to fetch sales',
            pagination: null,
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const addSale = async (req: Request, res: Response) => {
    try {
        const saleData = req.body;

        const validationResult = saleSchema.safeParse(saleData);

        if (!validationResult.success) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Validation failed',
                error: {
                    code: 400,
                    message: 'Invalid input',
                },
            });
            return;
        }

        const newSale = await createSaleService(saleData);

        res.status(201).json({
            success: true,
            data: newSale,
            message: 'Sale added successfully!',
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to add sale',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const updateSale = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const validationResult = saleSchema.partial().safeParse(req.body);

        if (!validationResult.success) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Validation failed',
                error: {
                    code: 400,
                    message: 'Invalid input',
                },
            });
            return;
        }

        const updatedSale = await updateSaleService(id, req.body);

        if (!updatedSale) {
            res.status(404).json({
                success: false,
                data: null,
                message: 'Sale not found',
                error: {
                    code: 404,
                    message: 'No sale found with the provided information',
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: updatedSale,
            message: 'Sale updated successfully!',
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to update sale',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const deleteSale = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedSale = await deleteSaleService(id);

        if (!deletedSale) {
            res.status(404).json({
                success: false,
                data: null,
                message: 'Sale not found',
                error: {
                    code: 404,
                    message: 'No sale found with the provided information',
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: null,
            message: 'Sale deleted successfully!',
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to delete sale',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const deleteMultipleSales = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Invalid Request',
                error: {
                    code: 400,
                    message: 'Please select at least one sale to delete.',
                },
            });
            return;
        }

        const result = await deleteMultipleSalesService(ids);

        res.status(200).json({
            success: true,
            data: { deletedCount: result.deletedCount },
            message: result.message,
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        if (error.message === 'No matching sales found') {
            res.status(404).json({
                success: false,
                data: null,
                message: 'Sales Not Found',
                error: {
                    code: 404,
                    message: 'No sales matched the provided information',
                },
            });
            return;
        }

        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to delete multiple sales',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};
