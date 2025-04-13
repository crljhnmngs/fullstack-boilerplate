import { useMutation } from '@tanstack/react-query';
import { useLoadingStore } from '@/application/store/loadingStore';
import toast from 'react-hot-toast';
import { UserUseCases } from '@/application/useCases/userUseCases';
import { UserWithoutId } from '@/domain/entities/user';
import { ProfileWithoutUserId } from '@/domain/entities/profile';
import { useNavigate } from 'react-router';

export const useRegisterUser = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (userData: UserWithoutId & ProfileWithoutUserId) =>
            UserUseCases.registerUser(userData),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            toast.success('Registed successfully!', {
                position: 'top-right',
            });
            navigate('/login');
        },
        onError: (error: Error) => {
            toast.error(error.message, { position: 'top-right' });
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
