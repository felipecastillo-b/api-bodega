import { getRoleByIdService, getRoleService } from '../services/roleService.js';

// Controlador para obtener todos los roles
export const getRoles = async (req, res) => {
    try {
        const roles = await getRoleService();
        return res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener los roles' });
    }
};

// Controlador para obtener un rol por ID
export const getRoleById = async (req, res) => {
    const roleId = parseInt(req.params.id);
    try {
        const role = await getRoleByIdService(roleId);
        if (!role) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        return res.status(200).json(role);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el rol' });
    }
};
