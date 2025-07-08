import express from 'express';
import { 
    addCategories,
    fetchCategories, 
    approveCategory, 
    rejectCategory ,
    getCategoriesByStaffId 
} from '../controllers/categories.js';
import {auth} from '../middleware/auth.js';
import {authStaff} from '../middleware/staffAuth.js'

const router = express.Router();

router.post('/add', addCategories);

router.get('/fetch',fetchCategories);
router.get('/gets/:id',authStaff,getCategoriesByStaffId)

router.put('/:id/approve',auth, approveCategory);
router.put('/:id/reject',auth, rejectCategory);
export default router;