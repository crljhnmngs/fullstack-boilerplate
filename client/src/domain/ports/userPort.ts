import {
    RegisterFormData,
    UpdateProfileFormData,
} from '@/presentation/validation/registerValidation';
import { ProfileWithoutUserId } from '../entities/profile';
import { UserWithoutId } from '../entities/user';
import {
    ApiResponse,
    FormError,
    PaginatedApiResponse,
    RegistrationResData,
    UserProfileResponse,
    UserWithProfile,
    GetAllUserParams,
} from '../types/api';
import { UserData } from '@/application/types';

export interface UserPort {
    registerUser(
        userData: UserWithoutId & ProfileWithoutUserId
    ): Promise<ApiResponse<RegistrationResData, FormError<RegisterFormData>>>;
    getUserProfile(): Promise<ApiResponse<UserProfileResponse>>;
    updateUserProfile(
        userData: Partial<UpdateProfileFormData>
    ): Promise<ApiResponse<UserData, FormError<UpdateProfileFormData>>>;
    getAllUsers(
        params: GetAllUserParams
    ): Promise<PaginatedApiResponse<UserWithProfile[]>>;
}
