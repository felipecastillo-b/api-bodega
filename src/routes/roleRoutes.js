import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getRoles } from '../controllers/roleController.js';
import { getUserById } from '../controllers/userController.js';

const router = Router();

router.get('/', authenticate, getRoles);
router.get('/:id', authenticate, getUserById    );

export default router;