import { UserPort } from '@/domain/ports/userPort';
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
                    if (data.error?.fieldErrors) {
                        setApiError(data.error?.fieldErrors);
                    } else if (data.error.field) {
                        setApiError({
                            field: data.error.field,
                            message: data.error.message,
                        });
                    }
                }
            }
            throw error;
        }
    },
    getUserProfile: async () => {
        return await userPort.getUserProfile();
    },
};
