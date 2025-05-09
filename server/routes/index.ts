import { Router } from 'express';
import authRoutes from './auth';
import candidateRoutes from './candidates';
import cvRoutes from './cv';
import publicCVRoutes from './public-cv';

const router = Router();

router.use('/auth', authRoutes);
router.use('/candidates', candidateRoutes);
router.use('/cv', cvRoutes);
router.use('/public/cv', publicCVRoutes);

export default router; 