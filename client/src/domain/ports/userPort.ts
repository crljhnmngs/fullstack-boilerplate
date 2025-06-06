import { RegisterFormData } from '@/presentation/validation/registerValidation';
import { ProfileWithoutUserId } from '../entities/profile';
import { UserWithoutId } from '../entities/user';
import {
    ApiResponse,
    FormError,
    RegistrationResData,
    UserProfileResponse,
} from '../types/api';

export interface UserPort {
    registerUser(
        userData: UserWithoutId & ProfileWithoutUserId
    ): Promise<ApiResponse<RegistrationResData, FormError<RegisterFormData>>>;
    getUserProfile(): Promise<ApiResponse<UserProfileResponse>>;
}
