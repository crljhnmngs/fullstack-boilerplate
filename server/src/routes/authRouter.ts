import { Router } from 'express';
import {
    handleRefreshToken,
    loginUser,
    logoutUser,
} from '../controllers/Auth/authController';

const authRouter = Router();

authRouter.post('/login', loginUser);
authRouter.post('/refresh', handleRefreshToken);
authRouter.post('/logout', logoutUser);

export default authRouter;
