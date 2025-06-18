import express from 'express';
import { signin, signUp, verifySignup } from '../controllers/admin.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/verifyinguser', verifySignup);
router.post('/signin', signin);

export default router;