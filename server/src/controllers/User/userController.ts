import { Request, Response } from 'express';
import {
    UserSchema,
    UserProfileSchema,
} from '../../utils/validation/User/userValidation';
import { registerUserService } from '../../services/User/userService';
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
