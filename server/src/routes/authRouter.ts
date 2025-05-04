import { Router } from 'express';
import {
    handleRefreshToken,
    loginUser,
} from '../controllers/Auth/authController';

const authRouter = Router();

authRouter.post('/login', loginUser);
authRouter.post('/refresh', handleRefreshToken);

export default authRouter;
