import { RANDOM_USER_API_URL } from '../../lib/const';
import http from '../../infrastructure/httpService';
import { FetchRandomUserParams, RandomUser } from '../types';

export const RandomUserService = {
    getRandomUser: async ({
        results = 5,
        nationality = '',
    }: FetchRandomUserParams = {}): Promise<RandomUser[]> => {
        const response = await http.get(RANDOM_USER_API_URL, {
            params: {
                results,
                nat: nationality,
            },
        });
        return response.data.results;
    },
};
