import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';

const router = Router();

router.post('/', authenticate, createTransaction);
router.get('/', authenticate, getTransactions);
router.get('/:id', authenticate, getTransactionById);
router.put('/:id', authenticate, updateTransaction);
router.delete('/:id', authenticate, deleteTransaction);

export default router;