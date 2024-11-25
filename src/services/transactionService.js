import prisma from '../prisma/prismaClient.js';

// Crear una nueva transaccion
export const createTransactionService = async ({ inventoryId, userId, statusId, transactionType, quantity, reason, productId }) => {
    // Obtener el precio del producto
    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { price: true, priceSell: true }
    });

    if (!product) {
        throw new Error("Producto no encontrado");
    }

    // Calcular el costo total de la transaccion
    const transactionCost = transactionType === 'purchase' ? -(product.price * quantity) : (product.priceSell * quantity);

    // crear la transaccion
    return await prisma.transaction.create({
        data: {
            inventoryId,
            userId,
            statusId,
            transactionType,
            quantity,
            transactionCost,
            reason,
            productId,
            createdAt: new Date()
        }
    });
};

// Obtiene todas las transacciones
export const getTransactionsService = async () => {
    return await prisma.transaction.findMany({
        include: {
            inventory: true,
            user: true,
            status: true,
            product: {
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
};

// Obtiene una transaccion por ID
export const getTransactionByIdService = async (id) => {
    return await prisma.transaction.findUnique({
        where: { id: parseInt(id) },
        include: {
            inventory: true,
            user: true,
            status: true,
            product: true
        }
    });
};

// Actualiza una transaccion existente
export const updateTransactionService = async (id, transactionData) => {
    return await prisma.transaction.update({
        where: { id: parseInt(id) },
        data: transactionData
    });
};

// Eliminar una transaccion *analizar si dejar o no*
export const deleteTransactionService = async (id) => {
    return await prisma.transaction.delete({
        where: { id: parseInt(id) }
    });
};
