import prisma from '../prisma/prismaClient.js';

// Funciones de Company
export const getCompanyInfo = async (req, res) => {
    const companyId = req.userId; // Asegúrate de que estás autenticando correctamente

    console.log(`Request for company info with ID: ${companyId}`); // verificar el id

    try {
        const company = await prisma.company.findUnique({
            where: { id: Number(companyId) }
        });

        if (!company) {
            return res.status(404).json({ error: 'Compañía no encontrada' });
        }

        res.json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};