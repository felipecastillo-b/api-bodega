import { getProductsService, createProductService, updateProductService, deleteProductService } from '../services/productService.js';
import cloudinary from '../cloudinaryConfig.js';
import prisma from '../prisma/prismaClient.js';

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

        // subir la imagen si esta incluida
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products', // carpeta en Cloudinary
            });
            productData.image_url = result.secure_url; // URL de la imagen subida
        }

        const newProduct = await createProductService(productData);
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({ error: 'Error al crear producto' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params; // Obtiene el id desde los parámetros de la URL
    const productData = req.body; // Obtiene los datos del cuerpo de la solicitud

    try {
        // Asegurarse de que el ID sea un número entero
        const productId = parseInt(id, 10); // Convierte el ID a entero

        if (isNaN(productId)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        // Obtener el producto existente
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }, // Usa el ID como número
        });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Subir la nueva imagen si está presente
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products',
            });
            productData.image_url = result.secure_url; // URL de la imagen subida
        } else {
            // Si no se proporciona una nueva imagen, conservar la existente
            productData.image_url = existingProduct.image_url;
        }

        // Actualizar el producto
        const updatedProduct = await updateProductService(productId, productData); // Pasar el ID como número
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
