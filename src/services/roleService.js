import prisma from '../prisma/prismaClient.js';

// Obtener todos los roles con permisos
export const getRoleService = async () => {
    return await prisma.role.findMany({
        include: {
            permissions: {
                include: {
                    permission: true, // incluir detalles del permiso
                },
            },
        },
    });
};

// Obtener rol por ID con permisos
export const getRoleByIdService = async (roleId) => {
    return await prisma.role.findUnique({
        where: { id: roleId },
        include: {
            permissions: {
                include: {
                    permission: true, // incluir detalles del permiso
                },
            },
        },
    });
};
