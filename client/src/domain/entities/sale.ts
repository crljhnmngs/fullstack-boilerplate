export type Item = {
    _id: string;
    name: string;
    tags: string[];
    price: { $numberDecimal: string };
    quantity: number;
};

type Customer = {
    gender: 'M' | 'F';
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
    purchaseMethod: 'Online' | 'In store' | 'Phone';
};
