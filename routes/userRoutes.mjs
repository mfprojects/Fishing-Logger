import express from 'express';
import userController from '../controllers/userController.mjs';

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);

// Additional routes as needed

export default router;