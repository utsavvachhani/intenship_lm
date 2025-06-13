import express from 'express';
import { signin, signup, upadteAdminProfile, adminUpdatesRole } from '../controllers/admin.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.put('/:id',auth, upadteAdminProfile);
router.put('/updaterole/:id', adminUpdatesRole);

export default router;