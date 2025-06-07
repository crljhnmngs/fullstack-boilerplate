import { SalePort } from '@/domain/ports/salePort';
import {
    ApiResponse,
    GenericError,
    PaginatedApiResponse,
} from '@/domain/types/api';
import http from '@/infrastructure/httpService';
import { Sale } from '@/domain/entities/sale';

export const SaleService: SalePort = {
    async getAllSales(params) {
        const response = await http.get<
            PaginatedApiResponse<Sale[], GenericError>
        >('/v1/sales', {
            params,
        });
        return response.data;
    },

    async addSale(saleData) {
        const response = await http.post<ApiResponse<Sale>>(
            '/v1/sales',
            saleData
        );
        return response.data;
    },

    async updateSale(id, saleData) {
        const response = await http.patch<ApiResponse<Sale>>(
            `/v1/sales/${id}`,
            saleData
        );
        return response.data;
    },

    async deleteSale(id) {
        const response = await http.delete<ApiResponse>(`/v1/sales/${id}`);
        return response.data;
    },

    async deleteMultipleSale(ids) {
        const response = await http.delete<ApiResponse>('/v1/sales', {
            data: { ids },
        });
        return response.data;
    },
};
