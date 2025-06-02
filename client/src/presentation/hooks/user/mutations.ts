import { useMutation } from '@tanstack/react-query';
import { useLoadingStore } from '@/application/store/loadingStore';
import { UserUseCases } from '@/application/useCases/userUseCases';
import { UserWithoutId } from '@/domain/entities/user';
import { ProfileWithoutUserId } from '@/domain/entities/profile';
import { useNavigate } from 'react-router';
import { AlertIcon, showAlert } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export const useRegisterUser = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (userData: UserWithoutId & ProfileWithoutUserId) =>
            UserUseCases.registerUser(userData),
        onMutate: () => setLoading(true),
        onSuccess: (_, variables) => {
            const email = variables.email;
            showAlert({
                title: 'Registration Successful',
                icon: AlertIcon.Info,
                html: `
                    <p class="mb-2">We've sent a verification link to your email address.</p>
                    <p class="text-sm text-gray-700">
                        Please check your inbox and <strong>spam or junk folder</strong>.
                    </p>
                    <p class="mt-4 text-sm text-gray-800">
                        Didn’t receive the email?
                        <a href="/resend-verification?email=${encodeURIComponent(email)}" class="text-blue-500 underline">
                        Click here to resend
                        </a>
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
        onError: (error: Error) => {
            showAlert({
                title: 'Registration',
                text: error.message,
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
        },
        onSettled: () => setLoading(false),
    });
    return {
        registerUser: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
