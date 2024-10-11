import prisma from '../prisma/prismaClient.js';
import { createUserService } from '../services/companyService.js';
import { sendInvitationEmail } from '../utils/emailUtils.js';
import dotenv from 'dotenv';

dotenv.config();

// Get informacion de Company
export const getCompanyInfo = async (req, res) => {
    const companyId = req.user.companyId; // Asegúrate de que estás autenticando correctamente

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

// Invitar Usuario por Correo EXPERIMENTAL
export const inviteUser  = async (req, res) => {
    const { email } = req.body;
    const companyId = req.user.companyId;

    try 
    {
        // Verificar si el usuario existe
        const existingUser  = await prisma.user.findUnique({ where: { email } });
        if (existingUser ) {
            return res.status(400).json({ error: 'El Usuario ya esta registrado' });
        }

        // envio de email
        const invitationLink = `${process.env.FRONTEND_URL}/register`;
        await sendInvitationEmail(email, invitationLink);
        res.status(200).json({ message: 'Invitacion enviada' });

    } catch (error) {
        console.log('Error inviteUser :', error)
        res.status(500).json({ message: 'Error enviando la invitacion' });
    }
};

// Endpoint para que la Company cree sus Usuarios
export const createUser = async (req, res) => {
    const { username, email, password, full_name, roleId, statusId } = req.body;
    const companyId = req.companyId;

    // Verifica si todos los campos están presentes
    if (!username || !email || !password || !full_name || !roleId || statusId === undefined) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos.' });
    }

    try {
        const result = await createUserService({ username, email, password, full_name, roleId, statusId, companyId });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};