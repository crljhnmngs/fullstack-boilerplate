import { Router } from 'express';
import {
    addSale,
    deleteSale,
    getSales,
    updateSale,
    deleteMultipleSales,
} from '../controllers/Sale/saleController';
import { requireAuth } from '../middlewares/requireAuth';

const salesRouter = Router();

salesRouter.get('/', requireAuth, getSales);
salesRouter.post('/', requireAuth, addSale);
salesRouter.patch('/:id', requireAuth, updateSale);
salesRouter.delete('/:id', requireAuth, deleteSale);
salesRouter.delete('/', requireAuth, deleteMultipleSales);

export default salesRouter;
