import { useAuthStore } from '@/application/store/authStore';
import { useLoadingStore } from '@/application/store/loadingStore';
import { AuthUseCases } from '@/application/useCases/authUseCases';
import { LoginResponse, RefreshResponse } from '@/domain/types/api';
import { saveAuth } from '@/infrastructure/authStorage';
import { LoginParams } from '@/presentation/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export const useLoginUser = () => {
    const setLoading = useLoadingStore((state) => state.setLoading);
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const mutation = useMutation({
        mutationFn: (data: LoginParams) => AuthUseCases.login(data),
        onMutate: () => setLoading(true),
        onSuccess: (data: LoginResponse) => {
            saveAuth();
            navigate('/');
            setAuth(data.user, data.accessToken);
        },
        onError: (error: Error) => {
            toast.error(error.message, { position: 'top-right' });
        },
        onSettled: () => setLoading(false),
    });

    return {
        handleUserLogin: mutation.mutate,
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
        onSuccess: (data: RefreshResponse) => {
            saveAuth();
            setAuth(data.user, data.accessToken);
        },
        onError: () => {
            clearAuth();
            navigate('/login');
        },
        onSettled: () => setLoading(false),
    });

    return {
        handleRefresh: mutation.mutate,
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
        onError: (error: Error) => {
            toast.error(error.message, { position: 'top-right' });
        },
        onSettled: () => {
            clearAuth();
            setLoading(false);
        },
    });

    return {
        handleUserlogout: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
