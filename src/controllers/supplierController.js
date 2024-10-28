import { getSuppliersService, createSupplierService, updateSupplierService } from '../services/supplierService.js';

// Obtener la lista de proveedores
export const getSuppliers = async (req, res) => {
    try {
        const suppliersList = await getSuppliersService();
        return res.status(200).json(suppliersList);
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        return res.status(500).json({ error: 'Error al obtener proveedores' });
    }
};

// Crear un nuevo proveedor
export const createSupplier = async (req, res) => {
    const supplierData = req.body;
    try {
        const newSupplier = await createSupplierService(supplierData);
        return res.status(201).json(newSupplier);
    } catch (error) {
        console.error("Error al crear proveedor:", error);
        return res.status(500).json({ error: 'Error al crear proveedor' });
    }
};

// Actualizar un proveedor
export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const supplierData = req.body;
    try {
        const updatedSupplier = await updateSupplierService(id, supplierData);
        return res.status(200).json(updatedSupplier);
    } catch (error) {
        console.error("Error al actualizar proveedor:", error);
        return res.status(500).json({ error: 'Error al actualizar proveedor' });
    }
};