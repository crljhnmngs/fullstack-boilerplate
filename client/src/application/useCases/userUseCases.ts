import { UserPort } from '@/domain/ports/userPort';
import { handleApiError } from '@/lib/utils';
import { UserService } from '../services/userService';
import axios from 'axios';
import { useRegisterErrorStore } from '../store/errorStore';

const userPort: UserPort = UserService;

export const UserUseCases = {
    registerUser: async (...args: Parameters<UserPort['registerUser']>) => {
        try {
            return await userPort.registerUser(...args);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const { setApiError } = useRegisterErrorStore.getState();
                    const { data } = error.response;

                    setApiError(data);
                    if ('fieldErrors' in data) {
                        error.response.data = {
                            message: 'Data validation error',
                        };
                    }
                    if ('field' in data && 'message' in data) {
                        error.response.data = {
                            message: data.message,
                        };
                    }
                }
            }
            throw new Error(handleApiError(error, 'Failed to register user'));
        }
    },
    getUserProfile: async () => {
        try {
            return await userPort.getUserProfile();
        } catch (error) {
            throw new Error(
                handleApiError(error, 'Failed to get your profile')
            );
        }
    },
};
