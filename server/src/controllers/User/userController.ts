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
            res.status(400).json({ error: validationResult.error.issues });
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
        res.status(error?.code === EMAIL_EXIST_ERROR_CODE ? 400 : 500).json({
            error: error?.message || 'Failed to register user',
        });
    }
};
