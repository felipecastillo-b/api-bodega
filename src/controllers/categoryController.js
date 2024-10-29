import { getCategoriesService, createCategoryService, updateCategoryService, deleteCategoryService } from '../services/categoryService.js';

// Obtener todas las categorías
export const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService();
        return res.status(200).json(categories);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return res.status(500).json({ error: 'Error al obtener categorías' });
    }
};

// Crear una nueva categoría
export const createCategory = async (req, res) => {
    const categoryData = req.body;
    try {
        const newCategory = await createCategoryService(categoryData);
        return res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error al crear categoría:", error);
        return res.status(500).json({ error: 'Error al crear categoría' });
    }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const categoryData = req.body;
    try {
        const updatedCategory = await updateCategoryService(id, categoryData);
        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error al actualizar categoría:", error);
        return res.status(500).json({ error: 'Error al actualizar categoría' });
    }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCategoryService(id);
        return res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        return res.status(500).json({ error: 'Error al eliminar categoría' });
    }
};
