import { SaleFormData } from '@/schemas/sale/saleSchema';
import { GetSalesApiResponse } from '../../store/sales/types';
import http from '../httpService';
import axios from 'axios';

export const getAllSales = async (
    page: number,
    limit: number,
    search?: string,
    couponUsed?: boolean,
    purchaseMethod?: string
): Promise<GetSalesApiResponse> => {
    try {
        const response = await http.get<GetSalesApiResponse>('/v1/sales', {
            params: { page, limit, search, couponUsed, purchaseMethod },
        });
        return response.data || [];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const apiError = error.response.data as {
                message?: string;
                errors?: string[];
            };

            let errorMessage = 'An unexpected error occurred.';

            switch (status) {
                case 400:
                    errorMessage =
                        apiError.errors?.join(', ') || 'Invalid request.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized. Please log in.';
                    break;
                case 403:
                    errorMessage = 'Forbidden. You do not have access.';
                    break;
                case 404:
                    errorMessage = 'Sales data not found.';
                    break;
                case 500:
                    errorMessage = 'Server error. Try again later.';
                    break;
                default:
                    errorMessage = apiError.message || errorMessage;
            }

            throw new Error(errorMessage);
        } else if (axios.isAxiosError(error) && error.request) {
            throw new Error('Network error. Please check your connection.');
        }

        throw new Error('Something went wrong.');
    }
};

export const addSale = async (
    saleData: SaleFormData
): Promise<SaleFormData> => {
    try {
        const response = await http.post<SaleFormData>('/v1/sales', saleData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;
                const apiError = error.response.data as { message?: string };

                let errorMessage = apiError.message || 'Failed to add sale';

                console.log(apiError.message);
                if (status === 400) {
                    errorMessage = 'Invalid data. Please check your inputs.';
                } else if (status === 401) {
                    errorMessage = 'Unauthorized. Please log in.';
                } else if (status === 403) {
                    errorMessage =
                        'You do not have permission to perform this action.';
                } else if (status === 500) {
                    errorMessage = 'Server error. Try again later.';
                }

                throw new Error(errorMessage);
            } else if (error.request) {
                throw new Error('Network error. Please check your connection.');
            }
        }

        throw new Error('Something went wrong while adding the sale.');
    }
};

export const updateSale = async (
    id: string | undefined,
    saleData: Partial<SaleFormData>
): Promise<SaleFormData> => {
    try {
        const response = await http.patch<SaleFormData>(
            `/v1/sales/${id}`,
            saleData
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;
                const apiError = error.response.data as { message?: string };

                let errorMessage = apiError.message || 'Failed to update sale';

                if (status === 400) {
                    errorMessage = 'Invalid data. Please check your inputs.';
                } else if (status === 401) {
                    errorMessage = 'Unauthorized. Please log in.';
                } else if (status === 403) {
                    errorMessage =
                        'You do not have permission to perform this action.';
                } else if (status === 404) {
                    errorMessage = 'Sale not found.';
                } else if (status === 500) {
                    errorMessage = 'Server error. Try again later.';
                }

                throw new Error(errorMessage);
            } else if (error.request) {
                throw new Error('Network error. Please check your connection.');
            }
        }

        throw new Error('Something went wrong while updating the sale.');
    }
};

export const deleteSale = async (id: string | undefined): Promise<void> => {
    try {
        await http.delete(`/v1/sales/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;
                const apiError = error.response.data as { message?: string };

                let errorMessage = apiError.message || 'Failed to delete sale';

                if (status === 400) {
                    errorMessage = 'Invalid request. Please try again.';
                } else if (status === 401) {
                    errorMessage = 'Unauthorized. Please log in.';
                } else if (status === 403) {
                    errorMessage =
                        'You do not have permission to delete this sale.';
                } else if (status === 404) {
                    errorMessage = 'Sale not found.';
                } else if (status === 500) {
                    errorMessage = 'Server error. Try again later.';
                }

                throw new Error(errorMessage);
            } else if (error.request) {
                throw new Error('Network error. Please check your connection.');
            }
        }
        throw new Error('Something went wrong while deleting the sale.');
    }
};

export const deleteMultipleSale = async (
    ids: string[] | undefined
): Promise<{ message: string }> => {
    try {
        const response = await http.delete('/v1/sales', { data: { ids } });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;
                const apiError = error.response.data as { message?: string };

                let errorMessage = apiError.message || 'Failed to delete sales';

                if (status === 400) {
                    errorMessage = 'Invalid request. Please try again.';
                } else if (status === 401) {
                    errorMessage = 'Unauthorized. Please log in.';
                } else if (status === 403) {
                    errorMessage =
                        'You do not have permission to delete this sales.';
                } else if (status === 404) {
                    errorMessage = 'Sale not found.';
                } else if (status === 500) {
                    errorMessage = 'Server error. Try again later.';
                }

                throw new Error(errorMessage);
            } else if (error.request) {
                throw new Error('Network error. Please check your connection.');
            }
        }
        throw new Error('Something went wrong while deleting the sales.');
    }
};
