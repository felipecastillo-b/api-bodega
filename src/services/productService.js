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
        // Obtener el último id del producto
        const lastProduct = await prisma.product.findFirst({
            orderBy: {
                id: 'desc', // Ordena por id en orden descendente para obtener el último
            },
            select: {
                id: true,
            },
        });

        // Asignar el nuevo id como el siguiente al último encontrado
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        // Procesar los datos del nuevo producto
        const companyId = parseInt(productData.companyId, 10);
        const data = {
            id: newId, // Asignar el nuevo id
            name: productData.name,
            description: productData.description,
            sku: productData.sku,
            price: parseFloat(productData.price), // convierte el precio a float
            priceSell: parseFloat(productData.priceSell), // convierte el precio a float
            categoryId: parseInt(productData.categoryId, 10), // conecta a la categoria usando categoryId
            supplierId: parseInt(productData.supplierId, 10), // conecta al proveedor usando supplierId
            statusId: parseInt(productData.statusId, 10), // conecta al estado usando statusId
            companyId: companyId, // conecta a la compañía usando companyId
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
    const { id: productId, price, priceSell, categoryId, supplierId, statusId, companyId, ...dataToUpdate } = productData;

    if (price) dataToUpdate.price = parseFloat(price); // Convertir price a float
    if (priceSell) dataToUpdate.priceSell = parseFloat(priceSell); // Convertir priceSell a float
    if (categoryId) dataToUpdate.categoryId = parseInt(categoryId, 10); // Convertir categoryId a int
    if (supplierId) dataToUpdate.supplierId = parseInt(supplierId, 10); // Convertir supplierId a int
    if (statusId) dataToUpdate.statusId = parseInt(statusId, 10); // Convertir statusId a int
    if (companyId) dataToUpdate.companyId = parseInt(companyId, 10); // Convertir statusId a int

    return await prisma.product.update({
        where: { id: parseInt(id) }, // Usamos el ID como número
        data: dataToUpdate, // Solo pasamos los datos relevantes, sin el campo 'id'
    });
};

// Eliminar un producto
export const deleteProductService = async (id) => {
    return await prisma.product.delete({
        where: { id: parseInt(id) },
    });
};
