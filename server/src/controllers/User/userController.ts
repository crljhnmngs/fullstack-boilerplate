import { Request, Response } from 'express';
import {
    UserSchema,
    UserProfileSchema,
} from '../../utils/validation/User/userValidation';
import {
    getUserProfileService,
    registerUserService,
    updateUserProfileService,
    getAllUsersService,
} from '../../services/User/userService';
import { EMAIL_EXIST_ERROR_CODE } from '../../utils/const';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const RegisterUserSchema = UserSchema.merge(UserProfileSchema);

        const validationResult = RegisterUserSchema.safeParse(req.body);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.issues.map(
                (issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                })
            );

            res.status(400).json({
                success: false,
                data: null,
                message: 'Validation failed',
                error: {
                    code: 400,
                    message: 'One or more fields are invalid.',
                    fieldErrors: formattedErrors,
                },
            });
            return;
        }

        const profileImage = req.file ? req.file.buffer : null;

        const newUser = await registerUserService({
            ...req.body,
            profileImage,
        });

        res.status(201).json({
            success: true,
            data: newUser,
            message: 'User registered successfully!',
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        if (error?.code === EMAIL_EXIST_ERROR_CODE) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Failed to register',
                error: {
                    code: 400,
                    field: 'email',
                    message: error.message || 'Email already exists',
                },
            });
            return;
        }

        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to register',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                data: null,
                message: 'User not authenticated',
                error: {
                    code: 401,
                    message: 'You must be logged in to access this resource.',
                },
            });
            return;
        }

        const result = await getUserProfileService(userId);

        if (result.error) {
            res.status(result.status || 400).json({
                success: false,
                data: null,
                message: result.error,
                error: {
                    code: result.status || 400,
                    message: result.error,
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: result.profile,
            message: 'User profile retrieved successfully',
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                data: null,
                message: 'User not authenticated',
                error: {
                    code: 401,
                    message: 'User not authenticated',
                },
            });
            return;
        }

        const RegisterUserSchema = UserSchema.merge(UserProfileSchema);

        const validationResult = RegisterUserSchema.partial().safeParse(
            req.body
        );

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.issues.map(
                (issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                })
            );

            res.status(400).json({
                success: false,
                data: null,
                message: 'Validation failed',
                error: {
                    code: 400,
                    message: 'One or more fields are invalid.',
                    fieldErrors: formattedErrors,
                },
            });
            return;
        }

        const profileImage = req.file ? req.file.buffer : null;

        const userData = {
            ...req.body,
            profileImage,
        };

        const result = await updateUserProfileService(userId, userData);

        if (result.error) {
            res.status(result.status || 400).json({
                success: false,
                data: null,
                message: result.error,
                error: {
                    code: result.status || 400,
                    message: result.error,
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: result.user,
            message: 'Profile updated successfully!',
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        if (error?.code === EMAIL_EXIST_ERROR_CODE) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Failed to register',
                error: {
                    code: 400,
                    field: 'email',
                    message: error.message || 'Email already exists',
                },
            });
            return;
        }

        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = (req.query.search as string) || '';
        const role = req.query.role as string | undefined;
        const isEmailVerified = req.query.isEmailVerified
            ? req.query.isEmailVerified === 'true'
            : undefined;

        const { users, total } = await getAllUsersService(
            page,
            limit,
            search,
            userId,
            role,
            isEmailVerified
        );

        res.status(200).json({
            success: true,
            data: users,
            message: 'Users retrieved successfully!',
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                perPage: limit,
            },
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};
