import { IUser, IUserProfile } from '../../utils/interface/users';
import { User } from '../../models/User/users';
import { Profile } from '../../models/Profile/profiles';
import argon2 from 'argon2';
import { EMAIL_EXIST_ERROR_CODE } from '../../utils/const';
import { uploadSingleFile } from '../../utils/cloudinaryUploader';
import type { Express } from 'express';
import mongoose, { Types } from 'mongoose';
import { sendEmailService } from '../Email/emailService';
import { keys } from '../../config/keys';
import { generateConfirmationEmail } from '../../utils/emailTemplates';
import { generateToken } from '../../utils/generateToken';

export const registerUserService = async (
    userData: IUser & IUserProfile & { profileImage?: Express.Multer.File }
) => {
    const session = await mongoose.startSession();
    session.startTransaction();
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
            isEmailVerified: false,
        });

        let profileImageUrl = '';
        if (userData.profileImage) {
            try {
                profileImageUrl = await uploadSingleFile(
                    userData.profileImage,
                    'profile_images'
                );
            } catch (uploadError) {
                console.log(uploadError);
                throw { code: 500, message: 'Profile image upload failed' };
            }
        }

        const profile = new Profile({
            userId: newUser._id,
            address: userData.address,
            phone: userData.phone,
            birthdate: userData.birthdate,
            profileImage: profileImageUrl,
        });

        await newUser.save({ session });
        await profile.save({ session });

        const token = generateToken(newUser._id as string, '1h');
        let confirmationLink = `${keys.app.clientUrl}/confirm-email?token=${token}`;

        const emailHtml = generateConfirmationEmail(
            newUser.name,
            confirmationLink
        );

        const emailData = {
            to: newUser.email,
            subject: 'Confirm Your Email Address',
            html: emailHtml,
            text: `Hi ${newUser.name},\n\nPlease confirm your email by clicking the link: ${confirmationLink}`,
        };

        await sendEmailService(emailData);

        await session.commitTransaction();
        session.endSession();

        return newUser;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

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

export const getUserProfileService = async (userId: string) => {
    try {
        const profile = await Profile.findOne({
            userId: new Types.ObjectId(userId),
        }).select('-_id -userId');

        if (!profile) {
            return { error: 'User profile not found', status: 404 };
        }

        return { message: 'User profile found', profile };
    } catch (error) {
        console.log(error);
        return { error: 'Internal server error', status: 500 };
    }
};
