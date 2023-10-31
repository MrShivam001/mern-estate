import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test); // Assuming this is the original test function
router.post('/update/:id', verifyToken, updateUser);

export default router;
