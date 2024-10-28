import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js'
import roleRoutes from './routes/roleRoutes.js'
import warehouseRoutes from './routes/warehouseRoutes.js'

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/warehouse', warehouseRoutes)

export default app;
