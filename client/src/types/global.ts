import { Sale } from '@/store/sales/types';

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

export type SalesTableProps = {
    sales: Sale[];
    isLoading: boolean;
    pagination: Pagination;
    setPage: (page: number) => void;
    setPerPage: (value: number) => void;
};

export type PaginationControlsProps = {
    perPage: number;
    setPerPage: (value: number) => void;
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
};

export type SeoProps = {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
};
