import { Sale } from '@/domain/entities/sale';
import { DropdownPropsData, Pagination } from '@/domain/types/global';

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

export type DropdownProps<T> = {
    data: DropdownPropsData<T>[];
    value: T | undefined;
    setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    defaultText: string;
    contentWith?: string;
    triggerHeight?: string;
};

export type ConfirmationModalProps = {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    triggerText: string | React.ReactNode;
};
