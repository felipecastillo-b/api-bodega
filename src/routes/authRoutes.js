import { Router } from 'express';
import { login, loginCompany, register, registerCompany } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/registerCompany', registerCompany);
router.post('/loginCompany', loginCompany);
router.post('/register', register);
router.post('/login', login);


export default router;
