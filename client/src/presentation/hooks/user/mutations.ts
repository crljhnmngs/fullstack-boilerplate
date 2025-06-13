import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoadingStore } from '@/application/store/loadingStore';
import { UserUseCases } from '@/application/useCases/userUseCases';
import { UserWithoutId } from '@/domain/entities/user';
import { ProfileWithoutUserId } from '@/domain/entities/profile';
import { useNavigate } from 'react-router';
import { AlertIcon, handleApiErrorToast, showAlert } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { ApiResponse, RegistrationResData } from '@/domain/types/api';
import { UpdateProfileFormData } from '@/presentation/validation/registerValidation';
import { UserData } from '@/application/types';
import { useAuthStore } from '@/application/store/authStore';

export const useRegisterUser = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (userData: UserWithoutId & ProfileWithoutUserId) =>
            UserUseCases.registerUser(userData),
        onMutate: () => setLoading(true),
        onSuccess: (res: ApiResponse<RegistrationResData>, variables) => {
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
                        <a href="/resend-verification?email=${encodeURIComponent(res.data?.email ? res.data.email : email)}" class="text-blue-500 underline">
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
        onError: (error) => {
            handleApiErrorToast(error, 'Registration', 'Unable to register.');
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

export const useUpdateUserProfile = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const queryClient = useQueryClient();
    const { updateUser } = useAuthStore();

    const mutation = useMutation({
        mutationFn: (userData: Partial<UpdateProfileFormData>) =>
            UserUseCases.updateUserProfile(userData),
        onMutate: () => setLoading(true),
        onSuccess: (res: ApiResponse<UserData>) => {
            showAlert({
                title: 'Update Profile',
                text: res.message,
                icon: AlertIcon.Success,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            updateUser(res.data!);
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onError: (error) => {
            handleApiErrorToast(
                error,
                'Update Profile',
                'Unable to update your profile.'
            );
        },
        onSettled: () => setLoading(false),
    });
    return {
        updateUserProfile: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
