import express from 'express';
import { getWarehouses, addWarehouse, updateWarehouse, deleteWarehouse } from '../controllers/warehouseController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getWarehouses);
router.post('/', authenticate, addWarehouse);
router.put('/:id', authenticate, updateWarehouse);
router.delete('/:id', authenticate, deleteWarehouse);

export default router;
