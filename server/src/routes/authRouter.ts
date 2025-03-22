import { Router } from 'express';
import { loginUser } from '../controllers/Auth/authController';

const authRouter = Router();

authRouter.post('/login', loginUser);

export default authRouter;
