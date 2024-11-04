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

    try {
        const transaction = await createTransactionService({
            inventoryId,
            userId,
            statusId,
            transactionType,
            quantity,
            reason,
            productId
        });
        res.json(transaction);
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
