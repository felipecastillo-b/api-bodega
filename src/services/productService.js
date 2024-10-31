import prisma from '../prisma/prismaClient.js';

// Obtener todos los productos con relaciones
export const getProductsService = async () => {
    return await prisma.product.findMany({
        include: {
            category: true,
            company: true,
            supplier: true,
            status: true,
            inventoryItems: true, // Incluye inventario si es necesario
        },
    });
};

// Crear un nuevo producto
export const createProductService = async (productData) => {
    try {
        const data = {
            name: productData.name,
            description: productData.description,
            sku: productData.sku,
            price: parseFloat(productData.price), // convierte el precio a float
            categoryId: parseInt(productData.categoryId, 10), // conecta a la categoria usando categoryId
            supplierId: parseInt(productData.supplierId, 10), // conecta al proveedor usando supplierId
            statusId: parseInt(productData.statusId, 10), // conecta al estado usando statusId
            companyId: productData.companyId, // conecta a la compañía usando companyId
            image_url: productData.image_url, // incluye la URL de la imagen
        };

        const product = await prisma.product.create({ data });
        return product;
    } catch (error) {
        console.error("Error al crear producto:", error);
        throw error;
    }
};

// Actualizar un producto existente
export const updateProductService = async (id, productData) => {
    return await prisma.product.update({
        where: { id: parseInt(id) },
        data: productData,
    });
};

// Eliminar un producto
export const deleteProductService = async (id) => {
    return await prisma.product.delete({
        where: { id: parseInt(id) },
    });
};
