import prisma from '../prisma/prismaClient.js';

// Obtener todas las bodegas
export const getWarehouseService = async () => {
    return await prisma.warehouse.findMany({
        include: {
            company: true // Incluir información de la compañía
        }
    });
};

// Crear una nueva bodega
export const createWarehouseService = async (warehouseData, companyId) => {
    return await prisma.warehouse.create({
        data: {
            name: warehouseData.name,
            location: warehouseData.location,
            company: {
                connect: {
                    id: companyId // Aquí se conecta a la compañía usando su ID
                }
            }
        },
        include: {
            company: true
        }
    });
};

export const updateWarehouseService = async (id, warehouseData) => {
    return await prisma.warehouse.update({
        where: { id: parseInt(id) },
        data: warehouseData,
        include: {
            company: true,
        }
    });
};

export const deleteWarehouseService = async (id) => {
    return await prisma.warehouse.delete({
        where: { id: parseInt(id) },
    });
};