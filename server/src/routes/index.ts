//Entry point for all routes
import { Router } from 'express';
import {
    addSale,
    deleteSale,
    getSales,
    updateSale,
} from '../controllers/Sale/saleController';

const router = Router();

router.get('/sales', getSales);
router.post('/sales', addSale);
router.patch('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);

export default router;
