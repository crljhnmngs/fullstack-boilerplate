import { AuthPort } from '@/domain/ports/authPort';
import { LoginResponse, RefreshResponse } from '@/domain/types/api';
import http from '@/infrastructure/httpService';

export const AuthService: AuthPort = {
    async login(data) {
        const response = await http.post<LoginResponse>(
            '/v1/auth/login',
            data,
            { withCredentials: true }
        );
        return response.data;
    },
    async refreshToken() {
        const response = await http.post<RefreshResponse>(
            '/v1/auth/refresh',
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    },
    async logout() {
        const response = await http.post<void>(
            '/v1/auth/logout',
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    },
    async confirmEmail(userId, token) {
        const response = await http.get<void>('/v1/auth/confirm-email', {
            params: { userId, token },
        });
        return response.data;
    },
    async resendVerification(userId, email) {
        const response = await http.get<void>(
            '/v1/auth/resend-email-verification',
            {
                params: { userId, email },
            }
        );
        return response.data;
    },
};
