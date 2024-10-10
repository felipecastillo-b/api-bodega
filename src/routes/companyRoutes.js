import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getCompanyInfo } from '../controllers/companyController.js';
// import controlador de company u otros necesarios

const router = Router();

// Definir rutas
router.get('/', authenticate, getCompanyInfo);

export default router;
