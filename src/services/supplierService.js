import prisma from '../prisma/prismaClient.js';

// Obtener todos los proveedores
export const getSuppliersService = async () => {
    return await prisma.supplier.findMany({
        include: {
            products: true, // Incluir informacion de los productos relacionados
        },
    });
};

// Crear un nuevo proveedor
export const createSupplierService = async (supplierData) => {
    return await prisma.supplier.create({
        data: supplierData,
    });
};

// Actualizar un proveedor existente
export const updateSupplierService = async (id, supplierData) => {
    // Remover el campo `products` si no esta presente o si es un array vacio
    const { products, ...updatedData } = supplierData;

    return await prisma.supplier.update({
        where: { id: parseInt(id) },
        data: updatedData, // Usar solo los campos sin `products`
    });
};