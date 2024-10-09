import cors from 'cors';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret';

// Middleware para autenticar el token JWT
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        res.status(401).json({ error: 'No autorizado' });
    }
};

// Ruta para registrar una empresa
app.post('/register', async (req, res) => {
    const { name, email, password, address, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const company = await prisma.company.create({
            data: {
                name,
                email,
                password: hashedPassword,
                address,
                phone,
            },
        });
        res.status(201).json({ message: 'Usuario registrado exitosamente', company });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar usuario' });
    }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const company = await prisma.company.findUnique({
        where: {
            email: email
        }
    });

    if (!company) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ companyId: company.id.toString() }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
