import { useForm } from 'react-hook-form';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/ui/button';
import { ROUTES } from '@/lib/routes';
import { NavLink, useLocation } from 'react-router';
import {
    ResetPasswordFormData,
    resetPasswordValidation,
} from '../validation/resetPasswordValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordParams } from '../types';
import { useEffect } from 'react';
import { useResetPasswordErrorStore } from '@/application/store/errorStore';
import { useResetPassword } from '../hooks/auth';

export const ResetPassword = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId') ?? '';
    const token = params.get('token') ?? '';
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordValidation),
        defaultValues: { password: '', confirmPassword: '' },
    });
    const { apiError, clearApiError } = useResetPasswordErrorStore();
    const { resetPassword, isError } = useResetPassword();

    const handleResetPassword = (formData: ResetPasswordFormData) => {
        const data: ResetPasswordParams = {
            userId: userId,
            token: token,
            newPassword: formData.password,
        };
        resetPassword(data);
    };

    useEffect(() => {
        if (isError && apiError) {
            if (Array.isArray(apiError)) {
                apiError.forEach((err) => {
                    setError(err.field, {
                        type: 'manual',
                        message: err.message,
                    });
                });
            } else if ('field' in apiError && 'message' in apiError) {
                setError(apiError.field as keyof ResetPasswordFormData, {
                    type: 'manual',
                    message: apiError.message,
                });
            }
            clearApiError();
        }
    }, [isError, apiError]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Set New Password
                </h1>

                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your new password below.
                </p>

                <form
                    onSubmit={handleSubmit(handleResetPassword)}
                    className="flex flex-col gap-4"
                >
                    <FormInput
                        name="password"
                        type="password"
                        placeholder="New password"
                        register={register}
                        error={errors?.password?.message}
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        register={register}
                        error={errors?.confirmPassword?.message}
                    />

                    <Button type="submit" className="w-full text-base h-11">
                        Reset Password
                    </Button>
                </form>
                <p className="text-sm text-center mt-4">
                    Back to&nbsp;
                    <NavLink
                        to={ROUTES.LOGIN}
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
