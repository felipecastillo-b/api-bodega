import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createSupplier, getSuppliers, updateSupplier } from '../controllers/supplierController.js';

const router = Router();

router.get('/', authenticate, getSuppliers);
router.post('/', authenticate, createSupplier);
router.put('/:id', authenticate, updateSupplier);

export default router;