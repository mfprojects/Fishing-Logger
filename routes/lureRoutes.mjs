import express from 'express';
import lureController from '../controllers/lureController.mjs';

const router = express.Router();

router.post('/lures', lureController.createLure);
router.get('/lures/:id', lureController.getLureById);

// Additional routes as needed

export default router;