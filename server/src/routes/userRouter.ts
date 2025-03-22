import { Router } from 'express';
import { registerUser } from '../controllers/User/userController';

const userRouter = Router();

userRouter.post('/', registerUser);

export default userRouter;
