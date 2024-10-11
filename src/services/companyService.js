import bcrypt from 'bcryptjs';
import prisma from '../prisma/prismaClient.js';

export const createUserService = async ({ username, email, password, full_name, roleId, statusId, companyId  }) => {

    // Verifica si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('El Usuario y/o Correo ya esta registrado')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Parsear a INT todos los ID
    const companyIdInt = parseInt(companyId);
    const roleIdInt = parseInt(roleId);
    const statusIdInt = parseInt(statusId);
    // Crear el usuario asignado a la companhia
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            full_name,
            companyId: companyIdInt,
            roleId: roleIdInt,
            statusId: statusIdInt,
        }
    });

    return { message: 'Usuario creado exitosamente', user: newUser };
};