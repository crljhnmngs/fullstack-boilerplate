import { Router } from 'express';
import {
    addSale,
    deleteSale,
    getSales,
    updateSale,
    deleteMultipleSales,
} from '../controllers/Sale/saleController';

const salesRouter = Router();

salesRouter.get('/', getSales);
salesRouter.post('/', addSale);
salesRouter.patch('/:id', updateSale);
salesRouter.delete('/:id', deleteSale);
salesRouter.delete('/', deleteMultipleSales);

export default salesRouter;
