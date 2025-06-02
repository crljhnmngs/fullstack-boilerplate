import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/ui/button';
import {
    forgotPasswordValidation,
    ForgotPasswordFormData,
} from '../validation/forgotPasswordValidation';
import { NavLink } from 'react-router';
import { ROUTES } from '@/lib/routes';
import { useForgotPassword } from '../hooks/auth';
import { useForgotPasswordErrorStore } from '@/application/store/errorStore';
import { useEffect } from 'react';

export const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordValidation),
        defaultValues: { email: '' },
    });

    const { handleForgotPassword, isError } = useForgotPassword();
    const { apiError, clearApiError } = useForgotPasswordErrorStore();

    const handleSendResetLink = (data: ForgotPasswordFormData) => {
        handleForgotPassword({ email: data.email });
    };

    useEffect(() => {
        if (isError && apiError) {
            if (
                'fieldErrors' in apiError &&
                Array.isArray(apiError.fieldErrors)
            ) {
                apiError.fieldErrors.forEach((err) => {
                    setError(err.field, {
                        type: 'manual',
                        message: err.message,
                    });
                });
            } else if ('field' in apiError && 'message' in apiError) {
                setError(apiError.field as keyof ForgotPasswordFormData, {
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
                    Reset Password
                </h1>

                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your email to receive a password reset link.
                </p>

                <form
                    onSubmit={handleSubmit(handleSendResetLink)}
                    className="flex flex-col gap-4"
                >
                    <FormInput
                        name="email"
                        type="email"
                        placeholder="Your email"
                        register={register}
                        error={errors?.email?.message}
                    />

                    <Button type="submit" className="w-full text-base h-11">
                        Send Reset Link
                    </Button>
                </form>
                <p className="text-sm text-center mt-4">
                    Remembered your password?
                    <NavLink
                        to={ROUTES.LOGIN}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
