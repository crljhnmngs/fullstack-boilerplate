import { ProfileWithoutUserId } from '../entities/profile';
import { UserWithoutId } from '../entities/user';
import { UserProfileResponse } from '../types/api';

export interface UserPort {
    registerUser(
        userData: UserWithoutId & ProfileWithoutUserId
    ): Promise<UserWithoutId & ProfileWithoutUserId>;
    getUserProfile(): Promise<UserProfileResponse>;
}
