//Entry point for all routes
import { Router } from 'express';
import { getSales } from '../controllers/Sale/saleController';

const router = Router();

router.get('/sales', getSales);
export default router;
