import { SalePort } from '@/domain/ports/salePort';
import { SaleService } from '@/application/services/saleService';
import { handleApiError } from '@/lib/utils';

const salePort: SalePort = SaleService;

export const SaleUseCases = {
    getAllSales: async (...args: Parameters<SalePort['getAllSales']>) => {
        try {
            return await salePort.getAllSales(...args);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to fetch sales.'));
        }
    },

    addSale: async (...args: Parameters<SalePort['addSale']>) => {
        try {
            return await salePort.addSale(...args);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to add sale.'));
        }
    },

    updateSale: async (...args: Parameters<SalePort['updateSale']>) => {
        try {
            return await salePort.updateSale(...args);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to update sale.'));
        }
    },

    deleteSale: async (...args: Parameters<SalePort['deleteSale']>) => {
        try {
            return await salePort.deleteSale(...args);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to delete sale.'));
        }
    },

    deleteMultipleSale: async (
        ...args: Parameters<SalePort['deleteMultipleSale']>
    ) => {
        try {
            return await salePort.deleteMultipleSale(...args);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to delete sales.'));
        }
    },
};
