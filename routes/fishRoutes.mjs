import express from 'express';
//import fishController from '../controllers/fishController.mjs';
import { createFish, getFishById } from '../controllers/fishController.mjs'; // Use named imports

const router = express.Router();

router.post('/fish', createFish);
router.get('/fish/:id', getFishById);

// Additional routes as needed

export default router;