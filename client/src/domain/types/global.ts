export type Pagination = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
};

export type PaginatedResponse<T> = {
    data: T[];
    pagination: Pagination;
};

export type DropdownPropsData<T> = {
    value: T;
    label: string;
};
