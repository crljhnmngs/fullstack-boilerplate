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
};
export type PaginationControlsProps = {
    perPage: number;
    setPerPage: (value: number) => void;
    startItem: number;
    endItem: number;
    totalItems: number;
    page: number;
    totalPages: number;
    handlePrevious: () => void;
    handleNext: () => void;
};
