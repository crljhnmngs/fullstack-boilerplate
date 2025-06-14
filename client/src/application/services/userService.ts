import { UserPort } from '@/domain/ports/userPort';
import {
    ApiResponse,
    FormError,
    RegistrationResData,
    UserProfileResponse,
} from '@/domain/types/api';
import http from '@/infrastructure/httpService';
import {
    RegisterFormData,
    UpdateProfileFormData,
} from '@/presentation/validation/registerValidation';
import { UserData } from '../types';

export const UserService: UserPort = {
    async registerUser(userData) {
        const formData = new FormData();

        formData.append('firstname', userData.firstname);
        if (userData.middlename) {
            formData.append('middlename', userData.middlename);
        }
        formData.append('lastname', userData.lastname);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('role', userData.role);
        formData.append('country', userData.country);
        formData.append('state', userData.state);
        formData.append('city', userData.city);
        formData.append('phone', userData.phone);
        formData.append('birthdate', userData.birthdate.toISOString());

        if (userData.profileImage) {
            formData.append('profileImage', userData.profileImage);
        }

        const response = await http.post<
            ApiResponse<RegistrationResData, FormError<RegisterFormData>>
        >('/v1/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    async getUserProfile() {
        const response =
            await http.get<ApiResponse<UserProfileResponse>>(
                '/v1/users/profile'
            );
        return response.data;
    },
    async updateUserProfile(userData) {
        const formData = new FormData();

        Object.entries(userData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (key === 'birthdate' && value instanceof Date) {
                    formData.append(key, value.toISOString());
                } else if (key === 'profileImage' && value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value.toString());
                }
            }
        });

        const response = await http.patch<
            ApiResponse<UserData, FormError<UpdateProfileFormData>>
        >('/v1/users/update-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};
