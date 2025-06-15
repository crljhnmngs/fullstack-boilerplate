import { useQuery } from '@tanstack/react-query';
import {
    ApiResponse,
    UserProfileResponse,
    UserWithProfile,
} from '@/domain/types/api';
import { UserUseCases } from '@/application/useCases/userUseCases';
import { isAuthenticated } from '@/infrastructure/authStorage';
import { handleApiErrorToast } from '@/lib/utils';
import { useLoadingStore } from '@/application/store/loadingStore';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import { Pagination } from '@/domain/types/global';

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

export const useGetAllUsers = () => {
    const [users, setUsers] = useState<UserWithProfile[]>([]);
    const setLoading = useLoadingStore((state) => state.setLoading);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 10,
    });

    const [searchInput, setSearchInput] = useState('');
    const [search] = useDebounce(searchInput, 300);

    const [role, setRole] = useState<string | undefined>(undefined);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | undefined>(
        undefined
    );

    const {
        data: res,
        isLoading,
        error,
    } = useQuery({
        queryKey: [
            'users',
            pagination.currentPage,
            pagination.perPage,
            search,
            role,
            isEmailVerified,
        ],
        queryFn: async () => {
            setLoading(true);
            try {
                return await UserUseCases.getAllUsers({
                    page: pagination.currentPage,
                    limit: pagination.perPage,
                    search,
                    role,
                    isEmailVerified,
                });
            } finally {
                setLoading(false);
            }
        },
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (res) {
            setUsers(res.data!);
            setPagination(res.pagination);
        }
    }, [res, setUsers]);

    useEffect(() => {
        if (error) {
            handleApiErrorToast<UserWithProfile[]>(
                error,
                'Fetch Users',
                'Unable to load users data.'
            );
        }
    }, [error]);

    return {
        users,
        isLoading,
        pagination,
        setPage: (page: number) =>
            setPagination((prev) => ({ ...prev, currentPage: page })),
        setPerPage: (perPage: number) =>
            setPagination((prev) => ({ ...prev, perPage })),
        searchInput,
        setSearchInput,
        role,
        setRole,
        isEmailVerified,
        setIsEmailVerified,
    };
};
