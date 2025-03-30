import { SaleService } from '@/application/services/saleService';
import { SaleFormData } from '@/presentation/validation/saleValidation';
import { GetSalesApiResponse } from '@/domain/types/api';
import { handleApiError } from '@/lib/utils';

export const SaleUseCases = {
    getAllSales: async (
        page: number,
        limit: number,
        search?: string,
        couponUsed?: boolean,
        purchaseMethod?: string
    ): Promise<GetSalesApiResponse> => {
        try {
            return await SaleService.getAllSales({
                page,
                limit,
                search,
                couponUsed,
                purchaseMethod,
            });
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to fetch sales.'));
        }
    },

    addSale: async (saleData: SaleFormData): Promise<SaleFormData> => {
        try {
            return await SaleService.addSale(saleData);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to add sale.'));
        }
    },

    updateSale: async (
        id: string,
        saleData: Partial<SaleFormData>
    ): Promise<SaleFormData> => {
        try {
            return await SaleService.updateSale(id, saleData);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to update sale.'));
        }
    },

    deleteSale: async (id: string): Promise<void> => {
        try {
            return await SaleService.deleteSale(id);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to delete sale.'));
        }
    },

    deleteMultipleSale: async (ids: string[]): Promise<{ message: string }> => {
        try {
            return await SaleService.deleteMultipleSale(ids);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to delete sales.'));
        }
    },
};
