import { create } from 'zustand';
import { RegisterFormData } from '@/presentation/validation/registerValidation';

type FieldError<T> = {
    field: keyof T;
    message: string;
};

type FieldErrorsResponse<T> =
    | { fieldErrors: FieldError<T>[] }
    | { field?: keyof T; message?: string }
    | null;

interface ErrorState<T> {
    apiError: FieldErrorsResponse<T>;
    setApiError: (error: FieldErrorsResponse<T>) => void;
    clearApiError: () => void;
}

export const createErrorStore = <T>() =>
    create<ErrorState<T>>((set) => ({
        apiError: null,
        setApiError: (error) => set({ apiError: error }),
        clearApiError: () => set({ apiError: null }),
    }));

export const useRegisterErrorStore = createErrorStore<RegisterFormData>();
