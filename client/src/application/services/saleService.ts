import { SaleFormData } from '@/presentation/validation/saleValidation';
import { GetSalesApiResponse } from '@/domain/types/api';
import http from '@/infrastructure/httpService';

export const SaleService = {
    getAllSales: async (params: {
        page: number;
        limit: number;
        search?: string;
        couponUsed?: boolean;
        purchaseMethod?: string;
    }): Promise<GetSalesApiResponse> => {
        const response = await http.get<GetSalesApiResponse>('/v1/sales', {
            params,
        });
        return response.data || [];
    },

    addSale: async (saleData: SaleFormData): Promise<SaleFormData> => {
        const response = await http.post<SaleFormData>('/v1/sales', saleData);
        return response.data;
    },

    updateSale: async (
        id: string,
        saleData: Partial<SaleFormData>
    ): Promise<SaleFormData> => {
        const response = await http.patch<SaleFormData>(
            `/v1/sales/${id}`,
            saleData
        );
        return response.data;
    },

    deleteSale: async (id: string): Promise<void> => {
        await http.delete(`/v1/sales/${id}`);
    },

    deleteMultipleSale: async (ids: string[]): Promise<{ message: string }> => {
        const response = await http.delete('/v1/sales', { data: { ids } });
        return response.data;
    },
};
