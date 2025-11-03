import { getUsers, getUserById, addUser, login, signup } from "../controllers/userController.js";
import express from 'express';
import { verifyToken} from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', getUsers);
// router.post('/', addUser);
router.post('/login',  login)
router.post('/signup', signup)

export default router;
