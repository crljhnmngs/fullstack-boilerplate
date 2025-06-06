import { Request, Response } from 'express';
import {
    UserSchema,
    UserProfileSchema,
} from '../../utils/validation/User/userValidation';
import {
    getUserProfileService,
    registerUserService,
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
                    message: 'User not authenticated',
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
    } catch (error: any) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: {
                code: 500,
                message: 'Internal server error',
            },
        });
    }
};
