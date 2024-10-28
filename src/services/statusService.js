import prisma from '../prisma/prismaClient.js';

export const getStatusesService = async () => {
    return await prisma.status.findMany();
};
