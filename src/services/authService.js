import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';
import { JWT_SECRET } from '../utils/jwtUtils.js';

export const registerCompanyService = async (name, email, password, address, phone) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.company.create({
        data: {
            name,
            email,
            password: hashedPassword,
            address,
            phone,
        },
    });
};

export const loginCompanyService = async (email, password) => {
    const company = await prisma.company.findUnique({
        where: { email }
    });
    console.log(company)
    if (!company || !(await bcrypt.compare(password, company.password))) {
        return null;
    }

    const token = jwt.sign({ companyId: company.id.toString() }, JWT_SECRET, { expiresIn: '1h' });
    return token;
};

export const registerUserService = async (username, password, full_name, email, companyId, role) => {
    // Verifica si el usuario ya está registrado
    const existingUser  = await prisma.user.findUnique({ where: { email } });
    if (existingUser ) {
        throw new Error('El usuario ya está registrado con este correo electrónico');
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            full_name,
            companyId,
            role: {
                connect: { name: 'Employee' },
            },
            status: {
                connect: { name: 'Activo' },
            },
        },
    });

    return newUser;
};