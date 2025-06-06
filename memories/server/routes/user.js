import express from 'express';
import { signin, signup, upadteUserProfile } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', upadteUserProfile);

export default router;