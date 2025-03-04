import { SaleApiResponse } from '../../store/sales/types';
import http from '../httpService';

export const getAllSales = async (
    page: number,
    limit: number,
    search?: string,
    couponUsed?: boolean,
    purchaseMethod?: string
): Promise<SaleApiResponse> => {
    try {
        const response = await http.get<SaleApiResponse>('/v1/sales', {
            params: { page, limit, search, couponUsed, purchaseMethod },
        });
        return response.data || [];
    } catch (error) {
        console.error('Failed to fetch all sales:', error);
        throw new Error('Could not fetch all sales. Please try again later.');
    }
};
