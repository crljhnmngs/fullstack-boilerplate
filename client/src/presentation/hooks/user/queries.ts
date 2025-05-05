import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UserProfileResponse } from '@/domain/types/api';
import { UserUseCases } from '@/application/useCases/userUseCases';
import { isAuthenticated } from '@/infrastructure/authStorage';

export const useGetUserProfile = () => {
    const {
        data: userProfile,
        isLoading: isProfileLoading,
        error,
    } = useQuery<UserProfileResponse>({
        queryKey: ['userProfile'],
        queryFn: () => UserUseCases.getUserProfile(),
        refetchOnWindowFocus: false,
        enabled: isAuthenticated(),
        staleTime: 1000 * 60 * 5,
    });

    if (error) {
        toast.error((error as Error).message, { position: 'top-right' });
    }

    return {
        userProfile,
        isProfileLoading,
    };
};
