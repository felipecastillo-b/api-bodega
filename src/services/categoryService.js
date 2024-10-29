import prisma from '../prisma/prismaClient.js';

// Obtener todas las categorías
export const getCategoriesService = async () => {
    return await prisma.category.findMany();
};

// Crear una nueva categoría
export const createCategoryService = async (categoryData) => {
    return await prisma.category.create({
        data: categoryData,
    });
};

// Actualizar una categoría existente
export const updateCategoryService = async (id, categoryData) => {
    return await prisma.category.update({
        where: { id: parseInt(id) },
        data: categoryData,
    });
};

// Eliminar una categoría
export const deleteCategoryService = async (id) => {
    return await prisma.category.delete({
        where: { id: parseInt(id) },
    });
};
