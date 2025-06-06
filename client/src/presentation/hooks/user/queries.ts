import { useQuery } from '@tanstack/react-query';
import { ApiResponse, UserProfileResponse } from '@/domain/types/api';
import { UserUseCases } from '@/application/useCases/userUseCases';
import { isAuthenticated } from '@/infrastructure/authStorage';
import { handleApiErrorToast } from '@/lib/utils';

export const useGetUserProfile = () => {
    const {
        data: userProfile,
        isLoading: isProfileLoading,
        error,
    } = useQuery<ApiResponse<UserProfileResponse>>({
        queryKey: ['userProfile'],
        queryFn: () => UserUseCases.getUserProfile(),
        refetchOnWindowFocus: false,
        enabled: isAuthenticated(),
        staleTime: 1000 * 60 * 5,
    });

    if (error) {
        handleApiErrorToast<UserProfileResponse>(
            error,
            'Get User Profile',
            'Unable to get user profile.'
        );
    }

    return {
        userProfile,
        isProfileLoading,
    };
};
