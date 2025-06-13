import express from 'express';
import { signUp, verifySignup, signin } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/verifyinguser', verifySignup);
router.post('/signin', signin);

export default router;
