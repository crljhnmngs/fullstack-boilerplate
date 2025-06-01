import argon2 from 'argon2';
import { User } from '../../models/User/users';
import { ILoginData } from '../../utils/interface/auth';
import {
    generateJWTToken,
    generateSecureToken,
} from '../../utils/generateToken';
import jwt from 'jsonwebtoken';
import { keys } from '../../config/keys';
import { Token } from '../../models/Token/tokens';
import mongoose from 'mongoose';
import {
    generateConfirmationEmail,
    generateForgotPasswordEmail,
} from '../../utils/emailTemplates';
import { sendEmailService } from '../Email/emailService';

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

        if (!user.isEmailVerified) {
            return {
                error: 'Email not verified',
                userId: user._id,
                status: 403,
            };
        }

        const accessToken = generateJWTToken(user._id as string, '15m');
        const refreshToken = generateJWTToken(user._id as string, '7d');

        return {
            message: 'Login successful',
            user: {
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

export const refreshAccessTokenService = async (refreshToken: string) => {
    try {
        const decoded = jwt.verify(
            refreshToken,
            keys.app.JWTSecret
        ) as jwt.JwtPayload;

        const user = await User.findById(decoded.userId);

        if (!user) {
            return { error: 'User not found', status: 404 };
        }

        const accessToken = generateJWTToken(user._id as string, '15m');

        return {
            accessToken,
            user: {
                name: user.name,
                email: user.email,
            },
        };
    } catch (error) {
        console.log(error);
        return { error: 'Invalid or expired refresh token', status: 403 };
    }
};

export const confirmEmailService = async (
    tokenData: string,
    userId: string
) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findById(userId).session(session);
        if (!user) {
            await session.abortTransaction();
            return { error: 'User not found', status: 404 };
        }

        const token = await Token.findOne({ userId }).session(session);

        if (
            !token ||
            token.token !== tokenData ||
            token.type !== 'email_verification'
        ) {
            await session.abortTransaction();
            return { error: 'Verification link is Invalid', status: 400 };
        } else if (token.tokenExpires < new Date()) {
            await session.abortTransaction();
            return { error: 'Verification link is Expired', status: 400 };
        }

        user.isEmailVerified = true;
        await user.save({ session });

        await Token.findByIdAndDelete(token._id, { session });

        await session.commitTransaction();
        return { message: 'Email successfully confirmed' };
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        return { error: 'Internal server error', status: 500 };
    } finally {
        session.endSession();
    }
};

export const resendEmailVerificationService = async (
    userId: string,
    email: string
) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let user;

        if (!userId) {
            user = await User.findOne({ email }).session(session);
            userId = user?._id?.toString();
        } else {
            user = await User.findById(userId).session(session);
        }

        if (!user) {
            await session.abortTransaction();
            return { error: 'User not found', status: 404 };
        }

        if (user.isEmailVerified) {
            await session.abortTransaction();
            return { error: 'Email already verified', status: 400 };
        }

        let token = await Token.findOne({
            userId,
            type: 'email_verification',
        }).session(session);

        const newSecuretoken = generateSecureToken();
        const newExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hour expiry

        if (token) {
            // Update existing token
            token.token = newSecuretoken;
            token.tokenExpires = newExpiry;
            await token.save({ session });
        } else {
            // Create new token
            token = new Token({
                userId,
                token: newSecuretoken,
                type: 'email_verification',
                tokenExpires: newExpiry,
            });
            await token.save({ session });
        }

        const confirmationLink = `${keys.app.clientUrl}/confirm-email?token=${newSecuretoken}&userId=${userId}`;

        const emailHtml = generateConfirmationEmail(
            user.name,
            confirmationLink
        );

        const emailData = {
            to: user.email,
            subject: 'Confirm Your Email Address',
            html: emailHtml,
            text: `Hi ${user.name},\n\nPlease confirm your email by clicking the link: ${confirmationLink}`,
        };

        await sendEmailService(emailData);

        await session.commitTransaction();
        return { message: 'Verification email resent' };
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        return { error: 'Internal server error', status: 500 };
    } finally {
        session.endSession();
    }
};

export const forgotPasswordService = async (email: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findOne({ email }).session(session);

        const genericResponse = {
            message:
                'If an account with that email exists and is verified, you’ll receive a password reset link shortly.',
        };

        if (!user || !user.isEmailVerified) {
            await session.abortTransaction();
            return genericResponse;
        }

        await Token.deleteMany({
            userId: user._id,
            type: 'password_reset',
        }).session(session);

        const newSecuretoken = generateSecureToken();
        const newExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes expiry

        const token = new Token({
            userId: user._id,
            token: newSecuretoken,
            type: 'password_reset',
            tokenExpires: newExpiry,
        });
        await token.save({ session });

        const resetPasswordLink = `${keys.app.clientUrl}/reset-password?token=${newSecuretoken}&userId=${user._id}`;

        const emailHtml = generateForgotPasswordEmail(
            user.name,
            resetPasswordLink
        );

        const emailData = {
            to: email,
            subject: 'Reset Your Password',
            html: emailHtml,
            text: `Hi ${user.name},\n\nWe received a request to reset your password. You can reset it by clicking the link: ${resetPasswordLink}\n\nIf you did not request this, please ignore this email.`,
        };

        await sendEmailService(emailData);

        await session.commitTransaction();
        return genericResponse;
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        return { error: 'Internal server error', status: 500 };
    } finally {
        session.endSession();
    }
};
