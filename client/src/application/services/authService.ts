import { AuthPort } from '@/domain/ports/authPort';
import { LoginResponse } from '@/domain/types/api';
import http from '@/infrastructure/httpService';

export const AuthService: AuthPort = {
    async login(data) {
        const response = await http.post<LoginResponse>('/v1/auth/login', data);
        return response.data;
    },
};
