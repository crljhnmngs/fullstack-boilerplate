import { AuthPort } from '@/domain/ports/authPort';
import { AuthService } from '../services/authService';
import { isAxiosError } from 'axios';
import {
    useForgotPasswordErrorStore,
    useLoginErrorStore,
    useResetPasswordErrorStore,
} from '../store/errorStore';

const authPort: AuthPort = AuthService;

export const AuthUseCases = {
    login: async (...args: Parameters<AuthPort['login']>) => {
        try {
            return await authPort.login(...args);
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response) {
                    const { setApiError } = useLoginErrorStore.getState();
                    const { data } = error.response;
                    if (data.error?.fieldErrors) {
                        setApiError(data.error?.fieldErrors);
                    } else if (data.error.field) {
                        setApiError({
                            field: data.error.field,
                            message: data.error.message,
                        });
                    }
                }
            }
            throw error;
        }
    },
    refreshToken: async () => {
        return await authPort.refreshToken();
    },
    logout: async () => {
        return await authPort.logout();
    },
    confirmEmail: async (...args: Parameters<AuthPort['confirmEmail']>) => {
        return await authPort.confirmEmail(...args);
    },
    resendVerification: async (
        ...args: Parameters<AuthPort['resendVerification']>
    ) => {
        return await authPort.resendVerification(...args);
    },
    forgotPassword: async (...args: Parameters<AuthPort['forgotPassword']>) => {
        try {
            return await authPort.forgotPassword(...args);
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response) {
                    const { setApiError } =
                        useForgotPasswordErrorStore.getState();
                    const { data } = error.response;
                    if (
                        'fieldErrors' in data.error &&
                        Array.isArray(data.error.fieldErrors) &&
                        data.error.fieldErrors.length > 0
                    ) {
                        setApiError(data.error.fieldErrors);
                    }
                }
            }
            throw error;
        }
    },
    resetPassword: async (...args: Parameters<AuthPort['resetPassword']>) => {
        try {
            return await authPort.resetPassword(...args);
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response) {
                    const { setApiError } =
                        useResetPasswordErrorStore.getState();
                    const { data } = error.response;

                    if (
                        'fieldErrors' in data.error &&
                        Array.isArray(data.error.fieldErrors) &&
                        data.error.fieldErrors.length > 0
                    ) {
                        setApiError(data.error.fieldErrors);
                    }
                }
            }
            throw error;
        }
    },
};
