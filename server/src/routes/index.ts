//Entry point for all routes
import { Router } from 'express';
import { getSales } from '../controllers/saleController';

const router = Router();

router.get('/sales', getSales);
export default router;
