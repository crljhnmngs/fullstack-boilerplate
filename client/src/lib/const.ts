import { Customer, Sale } from '@/domain/entities/sale';

export const RANDOM_USER_API_URL = 'https://randomuser.me/api/';

export const couponUsed: {
    label: string;
    value: boolean;
}[] = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
];

export const purchaseMethodOptions: {
    label: string;
    value: Pick<Sale, 'purchaseMethod'>['purchaseMethod'];
}[] = [
    { label: 'Online', value: 'Online' },
    { label: 'In store', value: 'In store' },
    { label: 'Phone', value: 'Phone' },
];

export const genderOptions: {
    label: string;
    value: Pick<Customer, 'gender'>['gender'];
}[] = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Others', value: 'Others' },
];

export const PURCHASE_METHODS = ['Online', 'In store', 'Phone'] as const;
export const GENDERS = ['M', 'F', 'Others'] as const;
