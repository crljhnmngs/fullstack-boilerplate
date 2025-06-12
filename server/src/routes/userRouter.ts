import { Router } from 'express';
import {
    getUserProfile,
    registerUser,
    updateUserProfile,
} from '../controllers/User/userController';
import upload from '../config/multerConfig';
import { requireAuth } from '../middlewares/requireAuth';

const userRouter = Router();

userRouter.post('/', upload.single('profileImage'), registerUser);
userRouter.get('/profile', requireAuth, getUserProfile);
userRouter.patch(
    '/update-profile',
    upload.single('profileImage'),
    requireAuth,
    updateUserProfile
);

export default userRouter;
