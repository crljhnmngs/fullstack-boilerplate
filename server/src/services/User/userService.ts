import { IUser, IUserProfile } from '../../utils/interface/users';
import { User } from '../../models/User/users';
import { Profile } from '../../models/Profile/profiles';
import argon2 from 'argon2';
import { EMAIL_EXIST_ERROR_CODE } from '../../utils/const';

export const registerUserService = async (userData: IUser & IUserProfile) => {
    try {
        const hashedPassword = await argon2.hash(userData.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1,
        });

        const newUser = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        });

        const profile = new Profile({
            userId: newUser._id,
            address: userData.address,
            phone: userData.phone,
            birthdate: userData.birthdate,
            profileImage: userData.profileImage,
        });

        await Promise.all([newUser.save(), profile.save()]);

        return newUser;
    } catch (error) {
        let tempError;
        if (error?.code === EMAIL_EXIST_ERROR_CODE) {
            tempError = {
                code: error.code,
                message: 'Email already exists',
            };
        } else {
            tempError = {
                code: 500,
                message: 'Failed to register user',
            };
        }
        throw tempError;
    }
};
