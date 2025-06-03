import express from 'express';
import { createPost,getPost, getPostsBySearch, getPosts, updatePost, deletePost, likePost, commentpost} from '../controllers/posts.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/',getPosts);
router.get('/search',getPostsBySearch);
router.post('/',auth,createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth ,likePost);
router.post('/:id/commentPost', auth ,commentpost);

router.get('/:id',getPost);

export default router;