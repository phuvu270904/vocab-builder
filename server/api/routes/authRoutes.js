import express from 'express';
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', verifyToken, authController.logout);
router.get('/profile', verifyToken, authController.profile);
router.post('/refresh', authController.refresh);
router.put('/updateProfile', verifyToken, authController.updateProfile);
router.put('/resetPassword', verifyToken, authController.resetPassword);

export default router;

