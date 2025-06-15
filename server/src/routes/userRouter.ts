import { Router } from 'express';
import {
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllUsers,
} from '../controllers/User/userController';
import upload from '../config/multerConfig';
import { requireAuth } from '../middlewares/requireAuth';
import { requireRole } from '../middlewares/requireRole';
import { ROLES } from '../utils/const';

const userRouter = Router();

userRouter.post('/', upload.single('profileImage'), registerUser);
userRouter.get(
    '/profile',
    requireAuth,
    requireRole([ROLES.ADMIN, ROLES.USER]),
    getUserProfile
);
userRouter.patch(
    '/update-profile',
    upload.single('profileImage'),
    requireAuth,
    requireRole([ROLES.ADMIN, ROLES.USER]),
    updateUserProfile
);
userRouter.get('/', requireAuth, requireRole([ROLES.ADMIN]), getAllUsers);

export default userRouter;
