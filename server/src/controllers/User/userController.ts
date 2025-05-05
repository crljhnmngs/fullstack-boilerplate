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

            res.status(400).json({ fieldErrors: formattedErrors });
            return;
        }

        const profileImage = req.file ? req.file.buffer : null;

        const newUser = await registerUserService({
            ...req.body,
            profileImage,
        });

        res.status(201).json({ data: newUser });
    } catch (error) {
        // TODO: Implement a proper logging system (logs/errors.log)
        if (error?.code === EMAIL_EXIST_ERROR_CODE) {
            res.status(400).json({
                field: 'email',
                message: error.message || 'Email already exists',
            });
            return;
        }

        res.status(500).json({
            message: error?.message || 'Failed to register user',
        });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        const result = await getUserProfileService(userId);

        if (result.error) {
            res.status(result.status).json({ message: result.error });
            return;
        }

        res.status(200).json(result.profile);
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
