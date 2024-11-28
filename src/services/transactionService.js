import prisma from '../prisma/prismaClient.js';

// Crear una nueva transaccion
export const createTransactionService = async ({ inventoryId, userId, statusId, transactionType, quantity, reason, productId }) => {
    // Obtener la última transacción para determinar el próximo ID disponible
    const lastTransaction = await prisma.transaction.findFirst({
        orderBy: {
            id: 'desc'
        },
        select: {
            id: true
        }
    });

    const newId = lastTransaction ? lastTransaction.id + 1 : 1;

    // Obtener el precio del producto
    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { price: true, priceSell: true }
    });

    if (!product) {
        throw new Error("Producto no encontrado");
    }

    // Calcular el costo total de la transacción
    const transactionCost = transactionType === 'purchase' ? -(product.price * quantity) : (product.priceSell * quantity);

    // Crear la transacción con el nuevo ID
    return await prisma.transaction.create({
        data: {
            id: newId, // Asignar el nuevo ID generado
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
