import { useAuthStore } from '@/application/store/authStore';
import { useLoadingStore } from '@/application/store/loadingStore';
import { AuthUseCases } from '@/application/useCases/authUseCases';
import {
    ApiResponse,
    FormError,
    LoginResponse,
    RefreshResponse,
} from '@/domain/types/api';
import { saveAuth } from '@/infrastructure/authStorage';
import { ROLES } from '@/lib/const';
import { ROUTES } from '@/lib/routes';
import {
    AlertIcon,
    handleApiErrorToast,
    showAlert,
    showApiErrorAlert,
} from '@/lib/utils';
import { LoginParams, ResetPasswordParams } from '@/presentation/types';
import { LoginFormData } from '@/presentation/validation/loginValidation';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

export const useLoginUser = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const mutation = useMutation({
        mutationFn: (data: LoginParams) => AuthUseCases.login(data),
        onMutate: () => setLoading(true),
        onSuccess: (res: ApiResponse<LoginResponse>) => {
            if (res.data) {
                saveAuth();
                if (res.data.user.role === ROLES.ADMIN) {
                    navigate(ROUTES.ADMIN);
                } else if (res.data.user.role === ROLES.USER) {
                    navigate(ROUTES.USER);
                }
                setAuth(res.data.user, res.data.accessToken);
            } else {
                throw Error();
            }
        },
        onError: (
            error: ApiResponse<LoginResponse, FormError<LoginFormData>>,
            variables
        ) => {
            const email = encodeURIComponent(variables.email);
            if (isAxiosError(error)) {
                if (error.response) {
                    const res = error.response?.data;
                    if (res.error.code === 403) {
                        const html = `
                        <p class="text-red-600 mb-2">${res.error.message}</p>
                        <p>We have sent a verification link to your email.</p>
                        <p class="mt-2 text-sm text-gray-700">
                            Please also check your <strong>spam or junk folder</strong>.
                        </p>
                        <p class="mt-4 text-sm text-gray-800">
                            Didn’t receive an email?
                            <a href="/resend-verification?email=${email}" class="text-blue-500 underline">
                            Click here to resend
                            </a>
                        </p>`;
                        showApiErrorAlert({
                            title: 'Login Failed',
                            icon: AlertIcon.Warning,
                            html: html,
                        });
                    } else {
                        handleApiErrorToast(
                            error,
                            'Login Failed',
                            'Unable to login'
                        );
                    }
                } else {
                    handleApiErrorToast(
                        error,
                        'Login Failed',
                        'Unable to login'
                    );
                }
            } else {
                handleApiErrorToast(error, 'Login Failed', 'Unable to login');
            }
        },
        onSettled: () => setLoading(false),
    });

    return {
        userLogin: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export const useRefreshToken = () => {
    const { setAuth, clearAuth } = useAuthStore();
    const navigate = useNavigate();
    const setLoading = useLoadingStore((state) => state.setLoading);

    const mutation = useMutation({
        mutationFn: () => AuthUseCases.refreshToken(),
        onMutate: () => setLoading(true),
        onSuccess: (res: ApiResponse<RefreshResponse>) => {
            if (res.data) {
                saveAuth();
                setAuth(res.data.user, res.data.accessToken);
            } else {
                throw Error();
            }
        },
        onError: () => {
            clearAuth();
            navigate(ROUTES.LOGIN, { state: { showError: true } });
        },
        onSettled: () => setLoading(false),
    });

    return {
        refreshToken: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export const useLogoutUser = () => {
    const { clearAuth } = useAuthStore();
    const setLoading = useLoadingStore((state) => state.setLoading);

    const mutation = useMutation({
        mutationFn: () => AuthUseCases.logout(),
        onMutate: () => setLoading(true),
        onError: () => {
            showAlert({
                title: 'Something went wrong.',
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
        },
        onSettled: () => {
            clearAuth();
            setLoading(false);
        },
    });

    return {
        userlogout: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export const useConfirmEmail = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ userId, token }: { userId: string; token: string }) =>
            AuthUseCases.confirmEmail(userId, token),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            showAlert({
                title: 'Email Confirmed',
                icon: AlertIcon.Success,
                html: `
                    <p class="mb-2">Your email has been successfully verified.</p>
                    <p class="text-sm text-gray-700">
                        You can now log in to your account.
                    </p>
                `,
                showConfirmButton: true,
                timer: undefined,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(ROUTES.LOGIN);
                }
            });
        },
        onError: (error) => {
            const userId = mutation.variables?.userId ?? '';

            if (isAxiosError(error)) {
                if (error.response) {
                    const res = error.response?.data as ApiResponse;
                    const html = `
                    <p class="text-red-600 mb-2">${res.error?.message}</p>
                    ${
                        res.error?.message === 'Verification link is Expired' &&
                        userId
                            ? `<p class="mt-4 text-sm text-gray-800">
                            <a href="/resend-verification?userId=${userId}" class="text-blue-500 underline">
                            Click here to resend
                            </a>
                        </p>`
                            : ''
                    }
                `;
                    showApiErrorAlert({
                        title: 'Verification Failed',
                        icon: AlertIcon.Error,
                        html: html,
                        onConfirm: () => navigate(ROUTES.LOGIN),
                    });
                } else if (error.request) {
                    const html = `<p class="text-red-600 mb-2">Network error. Please check your connection.</p>`;
                    showApiErrorAlert({
                        title: 'Verification Failed',
                        icon: AlertIcon.Error,
                        html: html,
                        onConfirm: () => navigate(ROUTES.LOGIN),
                    });
                }
            } else {
                const html = `<p class="text-red-600 mb-2">Unable to verify your email</p>`;
                showApiErrorAlert({
                    title: 'Verification Failed',
                    icon: AlertIcon.Error,
                    html: html,
                    onConfirm: () => navigate(ROUTES.LOGIN),
                });
            }
        },
        onSettled: () => setLoading(false),
    });

    return {
        confirmEmail: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export const useResendVerification = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ userId, email }: { userId?: string; email?: string }) =>
            AuthUseCases.resendVerification(userId, email),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            showAlert({
                title: 'Verification Email Resent Successfully',
                icon: AlertIcon.Info,
                html: `
                    <p class="mb-2">We've sent a new verification link to your email address.</p>
                    <p class="text-sm text-gray-700">
                        Please check your inbox and <strong>spam or junk folder</strong>.
                    </p>
                `,
                showConfirmButton: true,
                timer: undefined,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(ROUTES.LOGIN);
                }
            });
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                if (error.response) {
                    const res = error.response?.data as ApiResponse;
                    const html = `
                    <p class="text-red-600 mb-2">${res.error?.message}</p>`;
                    showApiErrorAlert({
                        title: res.message,
                        icon: AlertIcon.Error,
                        html: html,
                        onConfirm: () => navigate(ROUTES.LOGIN),
                    });
                } else if (error.request) {
                    const html = `<p class="text-red-600 mb-2">Network error. Please check your connection.</p>`;
                    showApiErrorAlert({
                        title: 'Failed to Resend Verification Email',
                        icon: AlertIcon.Error,
                        html: html,
                        onConfirm: () => navigate(ROUTES.LOGIN),
                    });
                }
            } else {
                const html = `<p class="text-red-600 mb-2">Unable to resend verification email</p>`;
                showApiErrorAlert({
                    title: 'Failed to Resend Verification Email',
                    icon: AlertIcon.Error,
                    html: html,
                    onConfirm: () => navigate(ROUTES.LOGIN),
                });
            }
        },
        onSettled: () => setLoading(false),
    });

    return {
        resendVerification: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export const useForgotPassword = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ email }: { email: string }) =>
            AuthUseCases.forgotPassword(email),
        onMutate: () => setLoading(true),
        onSuccess: (res: ApiResponse) => {
            showAlert({
                title: 'Password Reset Email Sent',
                icon: AlertIcon.Info,
                html: `
                    <p class="mb-2">${res.message}</p>
                    <p class="text-sm text-gray-700">
                        Please check your inbox and your <strong>spam or junk folder</strong>.
                    </p>
                `,
                showConfirmButton: true,
                timer: undefined,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(ROUTES.LOGIN);
                }
            });
        },
        onError: (error) => {
            handleApiErrorToast(
                error,
                'Password Reset',
                'Failed to send password reset email'
            );
        },
        onSettled: () => setLoading(false),
    });

    return {
        forgotPassword: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export const useResetPassword = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data: ResetPasswordParams) =>
            AuthUseCases.resetPassword(data),

        onMutate: () => setLoading(true),

        onSuccess: (res: ApiResponse) => {
            showAlert({
                title: 'Password Successfully Reset',
                icon: AlertIcon.Success,
                html: `
                    <p class="mb-2">${res.message}</p>
                    <p class="text-sm text-gray-700">
                        You can now log in using your new password.
                    </p>
                `,
                showConfirmButton: true,
                timer: undefined,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(ROUTES.LOGIN);
                }
            });
        },

        onError: (error) => {
            handleApiErrorToast(
                error,
                'Password Reset Failed',
                'Failed to reset your password'
            );
        },

        onSettled: () => setLoading(false),
    });

    return {
        resetPassword: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
