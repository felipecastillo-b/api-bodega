import { Router } from 'express';
import { getUsers, getUserById } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUserById);

export default router;