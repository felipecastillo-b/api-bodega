import {
    createTransactionService,
    getTransactionsService,
    getTransactionByIdService,
    updateTransactionService,
    deleteTransactionService
} from '../services/transactionService.js';

// Crear una nueva transaccion
export const createTransaction = async (req, res) => {
    const { inventoryId, userId, statusId, transactionType, quantity, reason, productId } = req.body;

    // Validate required fields
    if (!inventoryId || !userId || !statusId || !transactionType || !quantity || !reason || !productId) {
        return res.status(400).json({ error: "Faltan datos requeridos para crear la transacción" });
    }

    try {
        // Parse IDs and quantity to integers
        const parsedInventoryId = parseInt(inventoryId);
        const parsedUserId = parseInt(userId);
        const parsedStatusId = parseInt(statusId);
        const parsedProductId = parseInt(productId);
        const parsedQuantity = parseInt(quantity);

        // Validate parsed values
        if (isNaN(parsedInventoryId) || isNaN(parsedUserId) || isNaN(parsedStatusId) || isNaN(parsedProductId) || isNaN(parsedQuantity)) {
            return res.status(400).json({ error: "ID de inventario, usuario, estado, producto o cantidad no válidos" });
        }

        const transaction = await createTransactionService({
            inventoryId: parsedInventoryId,
            userId: parsedUserId,
            statusId: parsedStatusId,
            transactionType,
            quantity: parsedQuantity,
            reason,
            productId: parsedProductId
        });
        res.status(201).json(transaction);
    } catch (error) {
        console.error("Error creating transaction:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Obtiene todas las transacciones
export const getTransactions = async (req, res) => {
    try {
        const transactions = await getTransactionsService();
        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Obtiene una transaccion por ID
export const getTransactionById = async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await getTransactionByIdService(id);
        if (!transaction) {
            return res.status(404).json({ error: "Transacción no encontrada" });
        }
        res.json(transaction);
    } catch (error) {
        console.error("Error fetching transaction:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Actualiza una transaccion existente
export const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const transactionData = req.body;

    try {
        const transaction = await updateTransactionService(id, transactionData);
        res.json(transaction);
    } catch (error) {
        console.error("Error updating transaction:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Elimina una transaccion *analizar*
export const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteTransactionService(id);
        res.json({ message: "Transacción eliminada correctamente" });
    } catch (error) {
        console.error("Error deleting transaction:", error.message);
        res.status(500).json({ error: error.message });
    }
};
