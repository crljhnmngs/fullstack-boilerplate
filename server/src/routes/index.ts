//Entry point for all routes
import { Router } from 'express';
import {
    addSale,
    deleteSale,
    getSales,
    updateSale,
    deleteMultipleSales,
} from '../controllers/Sale/saleController';

const router = Router();

router.get('/sales', getSales);
router.post('/sales', addSale);
router.patch('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);
router.delete('/sales', deleteMultipleSales);

export default router;
