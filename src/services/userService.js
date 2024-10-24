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
            role: true,
            status: true,
            company: true,
        },
    });
};
