import { Request, Response } from 'express';
import { loginSchema } from '../../utils/validation/Auth/authValidation';
import {
    loginUserService,
    refreshAccessTokenService,
} from '../../services/Auth/authService';
import { keys } from '../../config/keys';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const validationResult = loginSchema.safeParse(req.body);

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

        const result = await loginUserService(req.body);

        if (result.error) {
            if (result.status === 400) {
                const formattedErrors = [
                    {
                        field: 'email',
                        message: result.error,
                    },
                    {
                        field: 'password',
                        message: result.error,
                    },
                ];

                res.status(result.status).json({
                    fieldErrors: formattedErrors,
                });
            } else {
                res.status(result.status).json({ message: result.error });
            }

            return;
        }

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: keys.app.env !== 'DEV',
            sameSite: keys.app.env === 'DEV' ? 'lax' : 'none',
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
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            res.status(401).json({ message: 'Refresh token missing' });
            return;
        }

        const result = await refreshAccessTokenService(refreshToken);

        if (result.error) {
            res.status(result.status!).json({ message: result.error });
            return;
        }

        res.status(200).json({
            user: result.user,
            accessToken: result.accessToken,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: keys.app.env !== 'DEV',
            sameSite: keys.app.env === 'DEV' ? 'lax' : 'none',
            path: '/',
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
