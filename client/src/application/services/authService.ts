import { AuthPort } from '@/domain/ports/authPort';
import { LoginResponse, RefreshResponse } from '@/domain/types/api';
import http from '@/infrastructure/httpService';

export const AuthService: AuthPort = {
    async login(data) {
        const response = await http.post<LoginResponse>('/v1/auth/login', data);
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
};
