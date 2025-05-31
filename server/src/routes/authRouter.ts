import { Router } from 'express';
import {
    handleRefreshToken,
    loginUser,
    logoutUser,
    confirmEmail,
    resendEmailVerification,
} from '../controllers/Auth/authController';
import { confirmEmailLimiter, loginLimiter } from '../middlewares/limiter';

const authRouter = Router();

authRouter.post('/login', loginLimiter, loginUser);
authRouter.post('/refresh', handleRefreshToken);
authRouter.post('/logout', logoutUser);
authRouter.get('/confirm-email', confirmEmailLimiter, confirmEmail);
authRouter.get(
    '/resend-email-verification',
    confirmEmailLimiter,
    resendEmailVerification
);

export default authRouter;
