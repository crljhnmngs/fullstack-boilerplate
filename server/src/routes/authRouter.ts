import { Router } from 'express';
import {
    handleRefreshToken,
    loginUser,
    logoutUser,
    confirmEmail,
    resendEmailVerification,
    forgotPassword,
    resetPassword,
} from '../controllers/Auth/authController';
import {
    confirmEmailLimiter,
    loginLimiter,
    forgotPasswordLimiter,
} from '../middlewares/limiter';

const authRouter = Router();

authRouter.post('/login', loginLimiter, loginUser);
authRouter.post('/refresh', handleRefreshToken);
authRouter.post('/logout', logoutUser);
authRouter.post('/confirm-email', confirmEmailLimiter, confirmEmail);
authRouter.post(
    '/resend-email-verification',
    confirmEmailLimiter,
    resendEmailVerification
);
authRouter.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
authRouter.patch('/reset-password', resetPassword);

export default authRouter;
