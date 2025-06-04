import { LoginParams, ResetPasswordParams } from '@/presentation/types';
import { LoginResponse, RefreshResponse } from '../types/api';

export interface AuthPort {
    login(data: LoginParams): Promise<LoginResponse>;
    refreshToken(): Promise<RefreshResponse>;
    logout(): Promise<void>;
    confirmEmail(userId: string, token: string): Promise<void>;
    resendVerification(userId?: string, email?: string): Promise<void>;
    forgotPassword(email: string): Promise<{ message: string }>;
    resetPassword(data: ResetPasswordParams): Promise<{ message: string }>;
}
