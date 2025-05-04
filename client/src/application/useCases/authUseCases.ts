import { AuthPort } from '@/domain/ports/authPort';
import { handleApiError } from '@/lib/utils';
import { AuthService } from '../services/authService';
import axios from 'axios';
import { useLoginErrorStore } from '../store/errorStore';

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
                            message: 'Failed to login',
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
};
