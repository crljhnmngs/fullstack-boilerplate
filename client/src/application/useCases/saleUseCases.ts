import { SalePort } from '@/domain/ports/salePort';
import { SaleService } from '@/application/services/saleService';

const salePort: SalePort = SaleService;

export const SaleUseCases = {
    getAllSales: async (...args: Parameters<SalePort['getAllSales']>) => {
        return await salePort.getAllSales(...args);
    },

    addSale: async (...args: Parameters<SalePort['addSale']>) => {
        return await salePort.addSale(...args);
    },

    updateSale: async (...args: Parameters<SalePort['updateSale']>) => {
        return await salePort.updateSale(...args);
    },

    deleteSale: async (...args: Parameters<SalePort['deleteSale']>) => {
        return await salePort.deleteSale(...args);
    },

    deleteMultipleSale: async (
        ...args: Parameters<SalePort['deleteMultipleSale']>
    ) => {
        return await salePort.deleteMultipleSale(...args);
    },
};
