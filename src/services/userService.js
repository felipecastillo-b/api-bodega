import prisma from '../prisma/prismaClient.js';

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        include: {
            role: true,
            status: true,
            company: true,
        },
    });
};

export const getUserById = async (userId) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        include: {
            role: {
                include: {
                    permissions:{
                        include: {
                            permission: true, // incluir detalles del permiso
                        },
                    },
                },
            },
            status: true,
            company: true,
        },
    });
};

// Actualizar informacion
export const updateUserService = async (userId, updateData) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            full_name: updateData.full_name,
            email: updateData.email,
        },
    });
};