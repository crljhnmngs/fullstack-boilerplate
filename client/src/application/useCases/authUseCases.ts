import { AuthPort } from '@/domain/ports/authPort';
import { handleApiError } from '@/lib/utils';
import { AuthService } from '../services/authService';
import axios from 'axios';
import {
    useForgotPasswordErrorStore,
    useLoginErrorStore,
} from '../store/errorStore';

const authPort: AuthPort = AuthService;

export const AuthUseCases = {
    login: async (...args: Parameters<AuthPort['login']>) => {
        try {
            return await authPort.login(...args);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const { setApiError } = useLoginErrorStore.getState();
                    const { data } = error.response;

                    setApiError(data);
                    if ('fieldErrors' in data) {
                        error.response.data = {
                            message: 'Invalid login credentials',
                        };
                    }
                    if ('field' in data && 'message' in data) {
                        error.response.data = {
                            message: data.message,
                        };
                    }
                }
            }
            throw new Error(handleApiError(error, 'Failed to login'));
        }
    },
    refreshToken: async () => {
        try {
            return await authPort.refreshToken();
        } catch (error) {
            throw new Error(
                handleApiError(error, 'Failed to generate new token')
            );
        }
    },
    logout: async () => {
        try {
            return await authPort.logout();
        } catch (error) {
            throw new Error(handleApiError(error, 'Logout failed'));
        }
    },
    confirmEmail: async (...args: Parameters<AuthPort['confirmEmail']>) => {
        try {
            return await authPort.confirmEmail(...args);
        } catch (error) {
            throw new Error(handleApiError(error, 'Confirm email failed'));
        }
    },
    resendVerification: async (
        ...args: Parameters<AuthPort['resendVerification']>
    ) => {
        try {
            return await authPort.resendVerification(...args);
        } catch (error) {
            throw new Error(
                handleApiError(error, 'Resend verification email failed')
            );
        }
    },
    forgotPassword: async (...args: Parameters<AuthPort['forgotPassword']>) => {
        try {
            return await authPort.forgotPassword(...args);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const { setApiError } =
                        useForgotPasswordErrorStore.getState();
                    const { data } = error.response;

                    if (
                        'fieldErrors' in data &&
                        Array.isArray(data.fieldErrors) &&
                        data.fieldErrors.length > 0
                    ) {
                        setApiError(data);
                        error.response.data = {
                            message: data.fieldErrors[0].message,
                        };
                    }
                }
            }
            throw new Error(
                handleApiError(error, 'Failed to send forgot password email')
            );
        }
    },
};
