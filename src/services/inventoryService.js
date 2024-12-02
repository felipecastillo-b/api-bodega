import prisma from '../prisma/prismaClient.js';

export const getAllInventoriesService = async () => {
    return await prisma.inventory.findMany({
        include: {
            products: {
                include: {
                    product: true,
                },
            },
            warehouse: true,
        },
    });
};

export const getInventoryByIdService = async (id) => {
    return await prisma.inventory.findUnique({
        where: { id: parseInt(id) },
        include: {
            products: {
                include: {
                    product: true,
                },
            },
            warehouse: true,
        },
    });
};

export const createInventoryService = async (data) => {
    return await prisma.inventory.create({
        data: {
            name: data.name,
            warehouse: {
                connect: { id: parseInt(data.warehouseId) },
            },
        },
    });
};

export const updateInventoryService = async (id, data) => {
    return await prisma.inventory.update({
        where: { id: parseInt(id) },
        data: {
            name: data.name,
            warehouse: {
                connect: { id: data.warehouseId },
            },
        },
    });
};

export const deleteInventoryService = async (id) => {
    return await prisma.inventory.delete({
        where: { id: parseInt(id) },
    });
};

// InventoryProduct

export const addProductToInventoryService = async (inventoryId, productId, quantity, minimumQuantity = 0) => {
    const existingProduct = await prisma.inventoryProduct.findUnique({
        where: {
            inventoryId_productId: {
                inventoryId: inventoryId,
                productId: productId,
            },
        },
    });

    if (existingProduct) {
        // Aqui puedes decidir si actualizas la cantidad o lanzas un error
        return await prisma.inventoryProduct.update({
            where: { id: existingProduct.id },
            data: { quantity: existingProduct.quantity + quantity },
        });
    } else {
        // Si no existe, crea uno nuevo
        return await prisma.inventoryProduct.create({
            data: {
                inventoryId: inventoryId,
                productId: productId,
                quantity: quantity,
                minimumQuantity: minimumQuantity,
            },
        });
    }
};

export const getProductsInInventoryService = async (inventoryId) => {
    return await prisma.inventoryProduct.findMany({
        where: { inventoryId: parseInt(inventoryId) },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                }
            },
        },
    });
};

export const getAllProductsInInventoryService = async () => {
    return await prisma.inventoryProduct.findMany({
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                },
            },
            inventory: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};

export const updateProductQuantityInInventoryService = async (inventoryId, productId, quantity) => {
    const existingProduct = await prisma.inventoryProduct.findUnique({
        where: {
            inventoryId_productId: {
                inventoryId: inventoryId,
                productId: productId,
            },
        },
    });

    if (existingProduct) {
        const newQuantity = existingProduct.quantity + quantity; // sumar o restar segun la operación
        if (newQuantity < 0) {
            throw new Error("No hay suficiente inventario para realizar la venta");
        }
        return await prisma.inventoryProduct.update({
            where: { id: existingProduct.id },
            data: { quantity: newQuantity },
        });
    } else {
        throw new Error("Producto no encontrado en el inventario");
    }
};

export const removeProductFromInventoryService = async (id) => {
    return await prisma.inventoryProduct.delete({
        where: { id: parseInt(id) },
    });
};

export const updateMinimumQuantityService = async (inventoryId, productId, minimumQuantity) => {
    const existingProduct = await prisma.inventoryProduct.findUnique({
        where: {
            inventoryId_productId: {
                inventoryId: inventoryId,
                productId: productId,
            },
        },
    });

    if (!existingProduct) {
        throw new Error("Producto no encontrado en el inventario");
    }

    return await prisma.inventoryProduct.update({
        where: {
            id: existingProduct.id,
        },
        data: {
            minimumQuantity: minimumQuantity,
        },
    });
};