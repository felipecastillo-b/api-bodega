import { getProductsService, createProductService, updateProductService, deleteProductService } from '../services/productService.js';

export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const createProduct = async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await createProductService(productData);
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({ error: 'Error al crear producto' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    try {
        const updatedProduct = await updateProductService(id, productData);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProductService(id);
        return res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return res.status(500).json({ error: 'Error al eliminar producto' });
    }
};
