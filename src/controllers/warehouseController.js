import { getWarehouseService, createWarehouseService, updateWarehouseService, deleteWarehouseService } from '../services/warehouseService.js';

export const getWarehouses = async (req, res) => {
    try {
        const warehouses = await getWarehouseService();
        return res.status(200).json(warehouses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener las bodegas' });
    }
};

export const addWarehouse = async (req, res) => {
    const warehouseData = req.body;
    const companyId = req.companyId;

    console.log("Company ID:", companyId);
    console.log("Warehouse Data:", warehouseData);

    // Verificar que companyId no sea undefined
    if (!companyId) {
        return res.status(400).json({ error: 'ID de compañía no disponible' });
    }

    try {
        const newWarehouse = await createWarehouseService(warehouseData, companyId);
        return res.status(201).json(newWarehouse);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear la bodega' });
    }
};

export const updateWarehouse = async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    try {
        const updatedWarehouse = await updateWarehouseService(id, { name, location });
        res.json(updatedWarehouse);
    } catch (error) {
        console.error("Error al actualizar la bodega:", error);
        res.status(500).json({ error: 'Error al actualizar la bodega' });
    }
};

export const deleteWarehouse = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteWarehouseService(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar la bodega:", error);
        res.status(500).json({ error: 'Error al eliminar la bodega' });
    }
};