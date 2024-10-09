import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { error } from 'console';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret';

// Define an interface for the JWT payload
interface JwtPayloadWithUserId extends JwtPayload {
    userId: string;
}

// Extend the Request interface to include userId
interface AuthenticatedRequest extends Request {
    userId?: string;
}

// Rutas aqui Ejemplo
//app.get('/', (req, res) => {
//    res.send(
//        '<h1>Api Bodega</h1><br><p>Lorem Ipsum Merol</p>'
//    );
//    console.log('Run Server');
//});

// Register de company
app.post('/register', async (req: Request, res: Response) => {
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

// Login de company
app.post('/login', async (req: Request, res: Response) => {
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

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});