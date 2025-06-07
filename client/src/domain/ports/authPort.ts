import { LoginParams, ResetPasswordParams } from '@/presentation/types';
import {
    ApiResponse,
    FormError,
    LoginResponse,
    RefreshResponse,
} from '../types/api';
import { LoginFormData } from '@/presentation/validation/loginValidation';
import { ForgotPasswordFormData } from '@/presentation/validation/forgotPasswordValidation';
import { ResetPasswordFormData } from '@/presentation/validation/resetPasswordValidation';

export interface AuthPort {
    login(
        data: LoginParams
    ): Promise<ApiResponse<LoginResponse, FormError<LoginFormData>>>;
    refreshToken(): Promise<ApiResponse<RefreshResponse>>;
    logout(): Promise<ApiResponse>;
    confirmEmail(userId: string, token: string): Promise<ApiResponse>;
    resendVerification(userId?: string, email?: string): Promise<ApiResponse>;
    forgotPassword(
        email: string
    ): Promise<ApiResponse<null, FormError<ForgotPasswordFormData>>>;
    resetPassword(
        data: ResetPasswordParams
    ): Promise<ApiResponse<null, FormError<ResetPasswordFormData>>>;
}
