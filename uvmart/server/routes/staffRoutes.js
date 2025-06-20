import express from 'express';
import {
    getProfile, 
    signUp, 
    verifySignup, 
    signin, 
    forget, 
    verifyingForeget,
    updateUserProfile, 
    fetchUnverifiedStaff,
    approveStaff,
    rejectStaff
} from '../controllers/staff.js';
import { auth } from '../middleware/auth.js'
import { authStaff } from '../middleware/staffAuth.js';

const router = express.Router();

router.get('/me',authStaff,getProfile)
router.post('/signup', signUp);
router.post('/verifyinguser', verifySignup);
router.post('/verifyingforeget',verifyingForeget)
router.post('/signin', signin);
router.post('/forget', forget);
router.put('/:id',updateUserProfile)

router.get('/unverified',fetchUnverifiedStaff)
router.put('/:id/approve',auth, approveStaff);
router.put('/:id/reject',auth, rejectStaff);

export default router;