import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';
import { JWT_SECRET } from '../utils/jwtUtils.js';

export const registerService = async (name, email, password, address, phone) => {
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

export const loginService = async (email, password) => {
    const company = await prisma.company.findUnique({
        where: { email }
    });

    if (!company || !(await bcrypt.compare(password, company.password))) {
        return null;
    }

    const token = jwt.sign({ companyId: company.id.toString() }, JWT_SECRET, { expiresIn: '1h' });
    return token;
};
