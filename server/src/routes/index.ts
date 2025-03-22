//Entry point for all routes
import { Router } from 'express';
import salesRouter from './salesRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';

const router = Router();

router.use('/sales', salesRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
