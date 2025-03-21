//Entry point for all routes
import { Router } from 'express';
import salesRouter from './salesRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/sales', salesRouter);
router.use('/users', userRouter);

export default router;
