import { UserData } from '@/application/types';
import { Sale } from '../entities/sale';
import { PaginatedResponse } from './global';

export type GetSalesApiResponse = PaginatedResponse<Sale>;

export type LoginResponse = {
    message: string;
    user: UserData;
    accessToken: string;
};
