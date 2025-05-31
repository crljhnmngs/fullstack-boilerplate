import { useQuery } from '@tanstack/react-query';
import { UserProfileResponse } from '@/domain/types/api';
import { UserUseCases } from '@/application/useCases/userUseCases';
import { isAuthenticated } from '@/infrastructure/authStorage';
import { AlertIcon, showAlert } from '@/lib/utils';

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
        showAlert({
            title: 'Get User Profile',
            text: error.message,
            icon: AlertIcon.Error,
            toast: true,
            position: 'top-right',
            timer: 3000,
            timerProgressBar: true,
        });
    }

    return {
        userProfile,
        isProfileLoading,
    };
};
