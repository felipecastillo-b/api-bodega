import { getAllUsers, getUserById as fetchUserById } from '../services/userService.js';
import { updateUserService } from '../services/userService.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

export const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    console.log("usercontroller consolelog:", userId);
    try {
        const user = await fetchUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

export const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const updateData = req.body;

    try {
        const updatedUser = await updateUserService(userId, updateData);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la información del usuario' });
    }
}