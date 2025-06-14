import { create } from 'zustand';
import {
    RegisterFormData,
    UpdateProfileFormData,
} from '@/presentation/validation/registerValidation';
import { LoginFormData } from '@/presentation/validation/loginValidation';
import { ForgotPasswordFormData } from '@/presentation/validation/forgotPasswordValidation';
import { ResetPasswordFormData } from '@/presentation/validation/resetPasswordValidation';

export type FieldError<T> = {
    field: keyof T;
    message: string;
};

export type FieldErrorsResponse<T> =
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
export const useLoginErrorStore = createErrorStore<LoginFormData>();
export const useForgotPasswordErrorStore =
    createErrorStore<ForgotPasswordFormData>();
export const useResetPasswordErrorStore =
    createErrorStore<ResetPasswordFormData>();
export const useUpdateProfileErrorStore =
    createErrorStore<UpdateProfileFormData>();
