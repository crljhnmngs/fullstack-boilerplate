import argon2 from 'argon2';
import { User } from '../../models/User/users';
import { ILoginData } from '../../utils/interface/auth';
import { generateToken } from '../../utils/generateToken';

export const loginUserService = async (loginData: ILoginData) => {
    try {
        const user = await User.findOne({ email: loginData.email });

        if (!user) {
            return { error: 'Invalid email or password', status: 400 };
        }

        const isPasswordValid = await argon2.verify(
            user.password,
            loginData.password
        );

        if (!isPasswordValid) {
            return { error: 'Invalid email or password', status: 400 };
        }

        const accessToken = generateToken(user._id as string, '15m');
        const refreshToken = generateToken(user._id as string, '7d');

        return {
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken,
        };
    } catch (error) {
        console.log(error);
        return { error: 'Internal server error', status: 500 };
    }
};
