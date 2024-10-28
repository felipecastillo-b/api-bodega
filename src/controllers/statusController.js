import { getStatusesService } from '../services/statusService.js';

export const getStatuses = async (req, res) => {
    try {
        const statuses = await getStatusesService();
        return res.status(200).json(statuses);
    } catch (error) {
        console.error("Error al obtener los estados:", error);
        return res.status(500).json({ error: 'Error al obtener los estados' });
    }
};
