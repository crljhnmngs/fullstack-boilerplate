import { SalePort } from '@/domain/ports/salePort';
import { SaleFormData } from '@/presentation/validation/saleValidation';
import { GetSalesApiResponse } from '@/domain/types/api';
import http from '@/infrastructure/httpService';

export const SaleService: SalePort = {
    async getAllSales(params) {
        const response = await http.get<GetSalesApiResponse>('/v1/sales', {
            params,
        });
        return response.data || [];
    },

    async addSale(saleData) {
        const response = await http.post<SaleFormData>('/v1/sales', saleData);
        return response.data;
    },

    async updateSale(id, saleData) {
        const response = await http.patch<SaleFormData>(
            `/v1/sales/${id}`,
            saleData
        );
        return response.data;
    },

    async deleteSale(id) {
        await http.delete(`/v1/sales/${id}`);
    },

    async deleteMultipleSale(ids) {
        const response = await http.delete('/v1/sales', { data: { ids } });
        return response.data;
    },
};
