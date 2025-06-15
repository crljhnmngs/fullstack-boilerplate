import { SaleFormData } from '@/presentation/validation/saleValidation';
import {
    PaginatedApiResponse,
    ApiResponse,
    GetSalesParams,
} from '@/domain/types/api';
import { Sale } from '../entities/sale';

export interface SalePort {
    getAllSales(params: GetSalesParams): Promise<PaginatedApiResponse<Sale[]>>;

    addSale(saleData: SaleFormData): Promise<ApiResponse<Sale>>;

    updateSale(
        id: string,
        saleData: Partial<SaleFormData>
    ): Promise<ApiResponse<Sale>>;

    deleteSale(id: string): Promise<ApiResponse>;

    deleteMultipleSale(ids: string[]): Promise<ApiResponse>;
}
