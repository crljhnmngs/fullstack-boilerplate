import { Router } from 'express';
import {
    addSale,
    deleteSale,
    getSales,
    updateSale,
    deleteMultipleSales,
} from '../controllers/Sale/saleController';
import { requireAuth } from '../middlewares/requireAuth';
import { requireRole } from '../middlewares/requireRole';
import { ROLES } from '../utils/const';

const salesRouter = Router();

salesRouter.get('/', requireAuth, requireRole([ROLES.ADMIN]), getSales);
salesRouter.post('/', requireAuth, requireRole([ROLES.ADMIN]), addSale);
salesRouter.patch('/:id', requireAuth, requireRole([ROLES.ADMIN]), updateSale);
salesRouter.delete('/:id', requireAuth, requireRole([ROLES.ADMIN]), deleteSale);
salesRouter.delete(
    '/',
    requireAuth,
    requireRole([ROLES.ADMIN]),
    deleteMultipleSales
);

export default salesRouter;
