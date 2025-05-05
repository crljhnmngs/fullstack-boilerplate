import { ProfileWithoutUserId } from '@/domain/entities/profile';
import { UserWithoutId } from '@/domain/entities/user';
import { UserPort } from '@/domain/ports/userPort';
import { UserProfileResponse } from '@/domain/types/api';
import http from '@/infrastructure/httpService';

export const UserService: UserPort = {
    async registerUser(userData) {
        const formData = new FormData();

        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('address', userData.address);
        formData.append('phone', userData.phone);
        formData.append('birthdate', userData.birthdate);

        if (userData.profileImage) {
            formData.append('profileImage', userData.profileImage);
        }

        const response = await http.post<UserWithoutId & ProfileWithoutUserId>(
            '/v1/users',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    },
    async getUserProfile() {
        const response =
            await http.get<UserProfileResponse>('/v1/users/profile');
        return response.data;
    },
};
