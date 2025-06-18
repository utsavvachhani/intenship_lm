import express from 'express';
import { 
    addCategories,
    fetchUnverifiedCategories, 
    approveCategory, 
    rejectCategory  
} from '../controllers/categories.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/add', addCategories);

router.get('/unverified',auth,fetchUnverifiedCategories);
router.put('/:id/approve',auth, approveCategory);
router.put('/:id/reject',auth, rejectCategory);
export default router;