import { UserPort } from '@/domain/ports/userPort';
import { handleApiError } from '@/lib/utils';
import { UserService } from '../services/userService';

const userPort: UserPort = UserService;

export const UserUseCases = {
    registerUser: async (...args: Parameters<UserPort['registerUser']>) => {
        try {
            return await userPort.registerUser(...args);
        } catch (error) {
            throw new Error(handleApiError(error, 'Failed to register user'));
        }
    },
};
