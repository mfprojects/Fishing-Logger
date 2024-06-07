import express from 'express';
import { createUser, getUserById } from '../controllers/userController.mjs'; // Use named imports

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUserById);

// Additional routes as needed

export default router;
