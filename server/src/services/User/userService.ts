import { IUser, IUserProfile } from '../../utils/interface/users';
import { User } from '../../models/User/users';
import { Profile } from '../../models/Profile/profiles';
import { EMAIL_EXIST_ERROR_CODE } from '../../utils/const';
import { uploadSingleFile } from '../../utils/cloudinaryUploader';
import type { Express } from 'express';
import mongoose, { Types } from 'mongoose';
import { sendEmailService } from '../Email/emailService';
import { keys } from '../../config/keys';
import { generateConfirmationEmail } from '../../utils/emailTemplates';
import { generateSecureToken } from '../../utils/generateToken';
import { Token } from '../../models/Token/tokens';
import { hashPassword } from '../../utils/hashPassword';

export const registerUserService = async (
    userData: IUser & IUserProfile & { profileImage?: Express.Multer.File }
) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const password = await hashPassword(userData.password);

        const newUser = new User({
            firstname: userData.firstname,
            middlename: userData.middlename,
            lastname: userData.lastname,
            email: userData.email,
            password: password,
            role: userData.role,
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
            country: userData.country,
            state: userData.state,
            city: userData.city,
            phone: userData.phone,
            birthdate: userData.birthdate,
            profileImage: profileImageUrl,
        });

        await newUser.save({ session });
        await profile.save({ session });

        const securetoken = generateSecureToken();

        const token = new Token({
            userId: newUser._id,
            token: securetoken,
            type: 'email_verification',
            tokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        });

        await token.save({ session });

        let confirmationLink = `${keys.app.clientUrl}/confirm-email?token=${securetoken}&userId=${newUser._id}`;

        const fullname = newUser.firstname + ' ' + newUser.lastname;
        const emailHtml = generateConfirmationEmail(fullname, confirmationLink);

        const emailData = {
            to: newUser.email,
            subject: 'Confirm Your Email Address',
            html: emailHtml,
            text: `Hi ${fullname},\n\nPlease confirm your email by clicking the link: ${confirmationLink}`,
        };

        await sendEmailService(emailData);

        await session.commitTransaction();
        session.endSession();

        return {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            isEmailVerified: newUser.isEmailVerified,
        };
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
