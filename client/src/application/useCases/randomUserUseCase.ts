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
            console.log(error);
            throw error;
        }
    },
};
