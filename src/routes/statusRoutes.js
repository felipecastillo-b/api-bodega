import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getStatuses } from '../controllers/statusController.js';

const router = Router();

router.get('/', authenticate, getStatuses);

export default router;