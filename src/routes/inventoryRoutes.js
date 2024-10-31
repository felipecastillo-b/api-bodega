import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
    getAllInventories,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
    addProductToInventory,
    getProductsInInventory,
    updateProductQuantityInInventory,
    removeProductFromInventory,
    listInventoryProducts
} from '../controllers/inventoryController.js';
const router = Router();

// Inventory rutas
router.get('/', authenticate, getAllInventories);
router.get('/:id', authenticate, getInventoryById);
router.post('/', authenticate, createInventory);
router.put('/:id', authenticate, updateInventory);
router.delete('/:id', authenticate, deleteInventory);

// InventoryProduct rutas
router.get('/:inventoryId/product', authenticate, listInventoryProducts);
router.post('/:inventoryId/product', authenticate, addProductToInventory);
router.get('/:inventoryId/product', authenticate, getProductsInInventory);
router.put('/product/:id', authenticate, updateProductQuantityInInventory);
router.delete('/inventory-product/:id', authenticate, removeProductFromInventory);

export default router;