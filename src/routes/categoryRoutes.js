import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';

const router = Router();

router.get('/', authenticate, getCategories);
router.post('/', authenticate, createCategory);
router.put('/:id', authenticate, updateCategory);
router.delete('/:id', authenticate, deleteCategory);


export default router;