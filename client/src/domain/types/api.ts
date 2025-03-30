import { Sale } from '../entities/sale';
import { PaginatedResponse } from './global';

export type GetSalesApiResponse = PaginatedResponse<Sale>;
