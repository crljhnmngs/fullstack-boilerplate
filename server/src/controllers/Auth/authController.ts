import { Request, Response } from 'express';
import {
    forgotPasswordSchema,
    loginSchema,
} from '../../utils/validation/Auth/authValidation';
import {
    confirmEmailService,
    loginUserService,
    refreshAccessTokenService,
    resendEmailVerificationService,
    forgotPasswordService,
    resetPasswordService,
} from '../../services/Auth/authService';
import { keys } from '../../config/keys';
import { PasswordSchema } from '../../utils/validation/User/userValidation';

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

            res.status(400).json({
                success: false,
                data: null,
                message: 'Validation failed',
                error: {
                    code: 400,
                    message: 'Invalid email or password input',
                    fieldErrors: formattedErrors,
                },
            });
            return;
        }

        const result = await loginUserService(req.body);
        if (result.error) {
            if (result.status === 400) {
                res.status(400).json({
                    success: false,
                    data: null,
                    message: 'Invalid credentials',
                    error: {
                        code: 400,
                        message: result.error,
                        fieldErrors: [
                            { field: 'email', message: result.error },
                            { field: 'password', message: result.error },
                        ],
                    },
                });
                return;
            }

            if (result.status === 403) {
                res.status(403).json({
                    success: false,
                    data: null,
                    message: result.error,
                    error: {
                        code: 403,
                        message: result.error,
                    },
                });
                return;
            }

            res.status(result.status).json({
                success: false,
                data: null,
                message: result.error,
                error: {
                    code: result.status,
                    message: result.error,
                },
            });
            return;
        }

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: keys.app.env !== 'DEV',
            sameSite: keys.app.env === 'DEV' ? 'lax' : 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            data: {
                user: result.user,
                accessToken: result.accessToken,
            },
            message: result.message,
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Login Failed',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            res.status(401).json({
                success: false,
                data: null,
                message: 'Something Went Wrong',
                error: {
                    code: 401,
                    message: 'Please log in again.',
                },
            });
            return;
        }

        const result = await refreshAccessTokenService(refreshToken);

        if (result.error) {
            res.status(result.status!).json({
                success: false,
                data: null,
                message: result.error,
                error: {
                    code: result.status!,
                    message: result.error,
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: {
                user: result.user,
                accessToken: result.accessToken,
            },
            message: 'Token refreshed successfully',
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something Went Wrong',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
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

        res.status(200).json({
            success: true,
            data: null,
            message: 'Logged out successfully',
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.log(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something Went Wrong',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please log in again.',
            },
        });
    }
};

export const confirmEmail = async (req: Request, res: Response) => {
    try {
        const { token, userId } = req.body;

        if (!token || !userId) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Invalid request parameters',
                error: {
                    code: 400,
                    message: 'Both token and userId are required',
                },
            });
            return;
        }

        const result = await confirmEmailService(
            token as string,
            userId as string
        );

        if (result.error) {
            res.status(result.status!).json({
                success: false,
                data: null,
                message: result.error,
                error: {
                    code: result.status!,
                    message: result.error,
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: null,
            message: result.message,
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error('Error in confirmEmail:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Confirm Email Failed',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const resendEmailVerification = async (req: Request, res: Response) => {
    try {
        const { userId, email } = req.body;

        if (!userId && !email) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Missing required data',
                error: {
                    code: 400,
                    message: 'Either userId or email must be provided',
                },
            });
            return;
        }

        const result = await resendEmailVerificationService(
            userId as string,
            email as string
        );

        if (result.error) {
            res.status(result.status!).json({
                success: false,
                data: null,
                message: result.error,
                error: {
                    code: result.status!,
                    message: result.error,
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: null,
            message: result.message,
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to Resend Verification Email',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const validationResult = forgotPasswordSchema.safeParse(req.body);

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
                    message: 'Invalid email input',
                    fieldErrors: formattedErrors,
                },
            });
            return;
        }

        const result = await forgotPasswordService(req.body.email);

        if ('error' in result) {
            res.status(result.status ?? 500).json({
                success: false,
                data: null,
                message: result.error,
                error: {
                    code: result.status ?? 500,
                    message: result.error,
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: null,
            message: result.message,
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Unable to send password reset link',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, userId, newPassword } = req.body;

        if (!token || !userId || !newPassword) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Missing required data',
                error: {
                    code: 400,
                    message: 'One or more required data were not provided',
                },
            });
            return;
        }

        const validationResult = PasswordSchema.safeParse(newPassword);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.issues.map(
                (issue) => ({
                    field: 'password',
                    message: issue.message,
                })
            );

            res.status(400).json({
                success: false,
                data: null,
                message: 'Password validation failed',
                error: {
                    code: 400,
                    message: 'Invalid password input',
                    fieldErrors: formattedErrors,
                },
            });
            return;
        }

        const result = await resetPasswordService(userId, token, newPassword);

        if ('error' in result) {
            res.status(result.status ?? 500).json({
                success: false,
                data: null,
                message: 'Password reset failed',
                error: {
                    code: result.status ?? 500,
                    message: result.error,
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: null,
            message: result.message,
            error: null,
        });
    } catch (error) {
        // TODO: Create a file logger function to store errors in logs/errors.log
        // This should include timestamps and error details
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Unable to reset your password',
            error: {
                code: 500,
                message:
                    'Something went wrong on our end. Please try again later.',
            },
        });
    }
};
