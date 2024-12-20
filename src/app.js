import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import warehouseRoutes from './routes/warehouseRoutes.js';
import statusRoutes from './routes/statusRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/warehouse', warehouseRoutes);
app.use('/status', statusRoutes);
app.use('/supplier', supplierRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/transaction', transactionRoutes);
app.use('/analysis', analysisRoutes);

export default app;
