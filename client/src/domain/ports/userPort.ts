import { ProfileWithoutUserId } from '../entities/profile';
import { UserWithoutId } from '../entities/user';

export interface UserPort {
    registerUser(
        userData: UserWithoutId & ProfileWithoutUserId
    ): Promise<UserWithoutId & ProfileWithoutUserId>;
}
