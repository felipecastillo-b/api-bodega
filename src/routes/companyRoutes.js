import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createUser, getCompanyInfo, inviteUser } from '../controllers/companyController.js';
// import controlador de company u otros necesarios

const router = Router();

// Definir rutas
router.get('/', authenticate, getCompanyInfo);
router.post('/inviteUser', authenticate, inviteUser); // Experimental
router.post('/createUser', authenticate, createUser);

export default router;
