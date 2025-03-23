import { Router } from 'express';
import { registerUser } from '../controllers/User/userController';
import upload from '../config/multerConfig';

const userRouter = Router();

userRouter.post('/', upload.single('profileImage'), registerUser);

export default userRouter;
