import express from 'express';
import lureController from '../controllers/lureController.mjs';

const router = express.Router();

router.post('/lures', lureController.createLure);
router.get('/lures/:id', lureController.getLureById);
router.put('/lures/:id', updateLure);
router.delete('/lures/:id', deleteLure);
// Additional routes as needed

export default router;