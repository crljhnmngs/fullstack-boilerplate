import { Decimal128 } from 'mongodb';
import { Document } from 'mongoose';

interface Item {
    items: string;
    tags: string[];
    price: Decimal128;
    quantity: number;
}

interface Customer {
    gender: string;
    age: number;
    email: string;
    satisfaction: number;
}

export interface ISale extends Document {
    saleDate: Date;
    items: Item[];
    storeLocation: string;
    customer: Customer;
    couponUsed: boolean;
    purchaseMethod: string;
}
