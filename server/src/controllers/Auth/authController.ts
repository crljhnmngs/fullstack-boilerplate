import { Request, Response } from 'express';
import { loginSchema } from '../../utils/validation/Auth/authValidation';
import { loginUserService } from '../../services/Auth/authService';
import { keys } from '../../config/keys';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const validationResult = loginSchema.safeParse(req.body);

        if (!validationResult.success) {
            res.status(400).json({ error: validationResult.error.issues });
            return;
        }

        const result = await loginUserService(req.body);

        if (result.error) {
            res.status(result.status).json({ error: result.error });
            return;
        }

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: keys.app.env !== 'DEV',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: result.message,
            user: result.user,
            accessToken: result.accessToken,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
