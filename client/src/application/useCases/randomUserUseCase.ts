import { handleApiError } from '@/lib/utils';
import { RandomUserService } from '../services/randomUserService';
import { FetchRandomUserParams, RandomUser } from '../types';

export const RandomUserUseCases = {
    getRandomUser: async ({
        results = 5,
        nationality = '',
    }: FetchRandomUserParams = {}): Promise<RandomUser[]> => {
        try {
            return await RandomUserService.getRandomUser({
                results,
                nationality,
            });
        } catch (error) {
            throw new Error(
                handleApiError(error, 'Failed to get random user.')
            );
        }
    },
};
