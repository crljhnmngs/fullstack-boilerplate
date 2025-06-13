import { Sale } from '@/domain/entities/sale';
import { Pagination } from '@/domain/types/global';
import { AlertIcon } from '@/lib/utils';
import { FormEvent, ReactNode } from 'react';
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
    classNames?: {
        label?: string;
        input?: string;
    };
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
    classNames?: {
        trigger?: string;
        content?: string;
        button?: string;
        label?: string;
    };
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

export type ShowAlertOptions = {
    title: string;
    text?: string;
    icon?: AlertIcon;
    timer?: number;
    position?:
        | 'top-end'
        | 'top'
        | 'top-left'
        | 'top-right'
        | 'center'
        | 'center-left'
        | 'center-right'
        | 'bottom'
        | 'bottom-left'
        | 'bottom-right';
    toast?: boolean;
    html?: string;
    showConfirmButton?: boolean;
    timerProgressBar?: boolean;
};

export type ResetPasswordParams = {
    userId?: string;
    token?: string;
    newPassword: string;
};
export type ComponentCardProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
    desc?: string;
};

export type BreadcrumbProps = {
    pageTitle: string;
};

export type CountryMapProps = {
    mapColor?: string;
};

type CountryCode = {
    code: string;
    label: string;
};

export type PhoneInputProps = {
    countries: CountryCode[];
    placeholder?: string;
    onChange?: (phoneNumber: string) => void;
    selectPosition?: 'start' | 'end';
};

export type FormProps = {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
    className?: string;
};

export type CheckboxProps = {
    label?: string;
    checked: boolean;
    className?: string;
    id?: string;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
};

export type FileInputProps = {
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type InputProps = {
    type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    className?: string;
    min?: string;
    max?: string;
    step?: number;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string;
};

export type RadioProps = {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    label: string;
    onChange: (value: string) => void;
    className?: string;
    disabled?: boolean;
};

export type TextareaProps = {
    placeholder?: string;
    rows?: number;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
    error?: boolean;
    hint?: string;
};

export type LabelProps = {
    htmlFor?: string;
    children: ReactNode;
    className?: string;
};

type Option = {
    value: string;
    text: string;
};

export type MultiSelectProps = {
    label: string;
    options: Option[];
    defaultSelected?: string[];
    onChange?: (selected: string[]) => void;
    disabled?: boolean;
};

type SelectOption = {
    value: string;
    label: string;
};

export type SelectProps = {
    options: SelectOption[];
    placeholder?: string;
    onChange: (value: string) => void;
    className?: string;
    defaultValue?: string;
};

export type SwitchProps = {
    label: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    color?: 'blue' | 'gray';
};

export type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; new?: boolean }[];
};

export type AvatarProps = {
    src: string;
    alt?: string;
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
    status?: 'online' | 'offline' | 'busy' | 'none';
};

export type AvatarTextProps = {
    name: string;
    className?: string;
};
