import { PaginatedResponse } from '@/types/global';

export type Item = {
    _id: string;
    name: string;
    tags: string[];
    price: number;
    quantity: number;
};

type Customer = {
    gender: string;
    age: number;
    email: string;
    satisfaction: number;
};

export type Sale = {
    _id: string;
    saleDate: string;
    items: Item[];
    storeLocation: string;
    customer: Customer;
    couponUsed: boolean;
    purchaseMethod: string;
};

export type SaleState = {
    sales: Sale[];
    setSales: (sales: Sale[]) => void;
};

export type SaleApiResponse = PaginatedResponse<Sale>;
