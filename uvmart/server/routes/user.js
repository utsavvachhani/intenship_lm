import express from 'express';
import { signUp, verifySignup, signin, forget, verifyingForeget,updateUserProfile,googleSignIn  } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/verifyinguser', verifySignup);
router.post('/verifyingforeget',verifyingForeget)
router.post('/signin', signin);
router.post('/forget', forget);
router.put('/:id',updateUserProfile);
router.post('/googlesignin',googleSignIn);

export default router;