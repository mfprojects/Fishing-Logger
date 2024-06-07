import express from 'express';
import fishController from '../controllers/fishController.mjs';

const router = express.Router();

router.post('/fish', fishController.createFish);
router.get('/fish/:id', fishController.getFishById);

// Additional routes as needed

export default router;