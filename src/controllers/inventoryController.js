import {
    getAllInventoriesService,
    getInventoryByIdService,
    createInventoryService,
    updateInventoryService,
    deleteInventoryService,
    addProductToInventoryService,
    getProductsInInventoryService,
    updateProductQuantityInInventoryService,
    removeProductFromInventoryService,
    getAllProductsInInventoryService,
    updateMinimumQuantityService
} from '../services/inventoryService.js';
import { createTransactionService } from '../services/transactionService.js';

export const getAllInventories = async (req, res) => {
    try {
        const inventories = await getAllInventoriesService();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventories' });
    }
};

export const getInventoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const inventory = await getInventoryByIdService(id);
        if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory' });
    }
};

export const createInventory = async (req, res) => {
    const { name, warehouseId } = req.body;
    try {
        const newInventory = await createInventoryService({ name, warehouseId });
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create inventory' });
    }
};

export const updateInventory = async (req, res) => {
    const { id } = req.params;
    const { name, warehouseId } = req.body;
    try {
        const updatedInventory = await updateInventoryService(id, { name, warehouseId });
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update inventory' });
    }
};

export const deleteInventory = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteInventoryService(id);
        res.status(200).json({ message: 'Inventory deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete inventory' });
    }
};

// InventoryProduct

export const addProductToInventory = async (req, res) => {
    const inventoryId = req.params.inventoryId;
    const { productId, quantity, minimumQuantity, transactionType } = req.body; // transactionType: 'purchase' o 'sale'

    console.log("Datos recibidos body:", req.body);
    console.log("Datos recibidos: inventoryid", req.params.inventoryId);

    const parsedInventoryId = parseInt(inventoryId);
    const parsedProductId = parseInt(productId);
    const parsedQuantity = parseInt(quantity);
    const parsedMinimumQuantity = minimumQuantity ? parseInt(minimumQuantity) : 0;

    if (isNaN(parsedInventoryId) || isNaN(parsedProductId) || isNaN(parsedQuantity)) {
        return res.status(400).json({ error: 'Datos invalidos' });
    }

    try {
        /*
        const newProductInInventory = await addProductToInventoryService(
            parsedInventoryId,
            parsedProductId,
            parsedQuantity,
            parsedMinimumQuantity
        );
        res.status(201).json(newProductInInventory);
        */
        // verifica si la operacion es una compra(purchase) o una venta(venta)
        if (transactionType === 'purchase') {
            // agregar productos al invnetario
            const newProductInInventory = await addProductToInventoryService(
                parsedInventoryId,
                parsedProductId,
                parsedQuantity,
                parsedMinimumQuantity
            );

            // crear transaccion de compra
            await createTransactionService({
                inventoryId: parsedInventoryId,
                userId: 1,
                statusId: 201,
                transactionType: 'purchase',
                quantity: parsedQuantity,
                reason: 'Compra de producto',
                productId: parsedProductId,
            });
            return res.status(201).json(newProductInInventory);
        } else if (transactionType === 'sale') {
            // restar productos al inventario
            const updatedProductInventory = await updateProductQuantityInInventoryService(
                parsedInventoryId,
                parsedProductId,
                -parsedQuantity, // resta la cantidad
            );
            // crear transaccion de venta
            await createTransactionService({
                inventoryId: parsedInventoryId,
                userId: 1,
                statusId: 201,
                transactionType: 'sale',
                quantity: parsedQuantity,
                reason: 'Venta de producto',
                productId: parsedProductId,
            });
            return res.status(200).json(updatedProductInventory);
        } else {
            console.log("Received body:", req.body);
            return res.status(400).json({ error: 'Tipo de transacción inválido' });
        }

    } catch (error) {
        console.error("Error al añadir producto al inventario:", error);
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "El producto ya existe en el inventario. Actualiza la cantidad en lugar de agregarlo." });
        }
        res.status(500).json({ message: "Error al añadir el producto al inventario", error: error.message });
    }
};

export const getAllProductsInInventory = async (req, res) => {
    try {
        const productsInInventory = await getAllProductsInInventoryService();
        return res.status(200).json(productsInInventory);
    } catch (error) {
        console.error('Error al obtener todos los productos en inventarios:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const listInventoryProducts = async (req, res) => {
    const inventoryId = parseInt(req.params.inventoryId);

    if (isNaN(inventoryId)) {
        return res.status(400).json({ error: 'ID inventory invalido' });
    }

    try {
        const products = await getProductsInInventoryService(inventoryId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error al listar productos del inventario:", error);
        res.status(500).json({ message: "Error al listar los productos del inventario", error: error.message });
    }
};

export const getProductsInInventory = async (req, res) => {
    const { inventoryId } = req.params;
    try {
        const products = await getProductsInInventoryService(inventoryId);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products in inventory' });
    }
};

export const updateProductQuantityInInventory = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const updatedProduct = await updateProductQuantityInInventoryService(id, quantity);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al actualizar la cantidad de producto' });
    }
};

export const removeProductFromInventory = async (req, res) => {
    const { id } = req.params; // Este debe ser el ID de InventoryProduct
    console.log(req.params);
    console.log("deleteando el id:", id);
    try {
        await removeProductFromInventoryService(id); // El servicio debe recibir este ID
        res.status(200).json({ message: 'Producto removido del inventario' });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: 'Error al remover el producto del inventario' });
    }
};

export const updateMinimumQuantity = async (req, res) => {
    const { inventoryId, productId } = req.params;
    const { minimumQuantity } = req.body;

    const parsedInventoryId = parseInt(inventoryId);
    const parsedProductId = parseInt(productId);
    const parsedMinimumQuantity = parseInt(minimumQuantity);

    if (isNaN(parsedInventoryId) || isNaN(parsedProductId) || isNaN(parsedMinimumQuantity)) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    try {
        const updatedProduct = await updateMinimumQuantityService(parsedInventoryId, parsedProductId, parsedMinimumQuantity);
        res.status(200).json({ message: 'Cantidad mínima actualizada correctamente', product: updatedProduct });
    } catch (error) {
        console.error("Error al actualizar la cantidad mínima:", error);
        res.status(500).json({ error: 'Error al actualizar la cantidad mínima', details: error.message });
    }
};