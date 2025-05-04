import { LoginParams } from '@/presentation/types';
import { LoginResponse, RefreshResponse } from '../types/api';

export interface AuthPort {
    login(data: LoginParams): Promise<LoginResponse>;
    refreshToken(): Promise<RefreshResponse>;
}
