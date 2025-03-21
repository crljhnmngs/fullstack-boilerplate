import { Router } from 'express';
import { registerdUser } from '../controllers/User/userController';

const userRouter = Router();

userRouter.post('/', registerdUser);

export default userRouter;
