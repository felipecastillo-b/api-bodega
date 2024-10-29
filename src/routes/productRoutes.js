import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';

const router = Router();

router.get('/', authenticate, getProducts);
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;