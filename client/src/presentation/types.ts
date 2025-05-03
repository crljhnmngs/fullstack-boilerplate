import { Sale } from '@/domain/entities/sale';
import { Pagination } from '@/domain/types/global';
import { UseFormRegister, RegisterOptions, Path } from 'react-hook-form';

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

export type DropdownPropsData<T> = {
    value: T;
    label: string;
};

export type DropdownProps<T> = {
    data: DropdownPropsData<T>[];
    value: T | undefined;
    setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
    defaultText: string;
    contentWith?: string;
    triggerHeight?: string;
    search?: boolean;
    searchPlaceholder?: string;
    searchEmptyText?: string;
};

export type ConfirmationModalProps = {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    triggerText: string | React.ReactNode;
};

export type FormInputProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = {
    name: Path<T>;
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'file';
    placeholder?: string;
    label?: string;
    className?: string;
    register: UseFormRegister<T>;
    rules?: RegisterOptions<T, Path<T>>;
    error?: string;
} & Record<string, unknown>;

export interface FormDropdownProps<T> {
    data: DropdownPropsData<T>[];
    value?: T;
    setValue: (
        value: T | undefined | ((prevValue: T | undefined) => T | undefined)
    ) => void;
    defaultText?: string;
    contentWith?: string;
    triggerHeight?: string;
    search?: boolean;
    searchPlaceholder?: string;
    searchEmptyText?: string;
    error?: string;
    label?: string;
    disable?: boolean;
}

export type LoginParams = {
    email: string;
    password: string;
};
