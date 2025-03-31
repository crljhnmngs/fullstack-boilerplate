import { SaleFormData } from '@/presentation/validation/saleValidation';
import { GetSalesApiResponse } from '@/domain/types/api';

export interface SalePort {
    getAllSales(params: {
        page: number;
        limit: number;
        search?: string;
        couponUsed?: boolean;
        purchaseMethod?: string;
    }): Promise<GetSalesApiResponse>;

    addSale(saleData: SaleFormData): Promise<SaleFormData>;

    updateSale(
        id: string,
        saleData: Partial<SaleFormData>
    ): Promise<SaleFormData>;

    deleteSale(id: string): Promise<void>;

    deleteMultipleSale(ids: string[]): Promise<{ message: string }>;
}
