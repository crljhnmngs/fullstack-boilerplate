import { User, FetchUsersParams, ApiResponse } from '../../store/user/types';
import { RANDOM_USER_API_URL } from '../../lib/const';
import http from '../httpService';

export const getRandomUsers = async ({
    results = 5,
    nationality = '',
}: FetchUsersParams = {}): Promise<User[]> => {
    try {
        const response = await http.get<ApiResponse>(RANDOM_USER_API_URL, {
            params: {
                results,
                nat: nationality,
            },
        });

        return response.data.results;
    } catch (error) {
        console.error('Failed to fetch random users:', error);
        throw new Error(
            'Could not fetch random users. Please try again later.',
        );
    }
};
