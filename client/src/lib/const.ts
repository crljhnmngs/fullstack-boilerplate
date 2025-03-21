export const RANDOM_USER_API_URL = 'https://randomuser.me/api/';

export const couponUsed = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
];

export const purchaseMethods = [
    { value: 'Online', label: 'Online' },
    { value: 'Phone', label: 'Phone' },
    { value: 'In store', label: 'In store' },
];

export const PURCHASE_METHODS = ['Online', 'In store', 'Phone'] as const;
export const GENDERS = ['M', 'F'] as const;
