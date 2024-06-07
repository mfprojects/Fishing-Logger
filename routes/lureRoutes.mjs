import express from 'express';
//import lureController from '../controllers/lureController.mjs';
import { createLure, getLureById } from '../controllers/lureController.mjs'; // Use named imports
const router = express.Router();

router.post('/lures', createLure);
router.get('/lures/:id', getLureById);
//router.put('/lures/:id', updateLure);
//router.delete('/lures/:id', deleteLure);
// Additional routes as needed

export default router;