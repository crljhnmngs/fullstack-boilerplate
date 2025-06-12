import { UserPort } from '@/domain/ports/userPort';
import {
    ApiResponse,
    FormError,
    RegistrationResData,
    UserProfileResponse,
} from '@/domain/types/api';
import http from '@/infrastructure/httpService';
import { RegisterFormData } from '@/presentation/validation/registerValidation';

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
};
