//Måtte skrive om her da __dirname ikke er supportert natively i ES moduler. Hodebry.
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createFish, getFish, getFishById, updateFish, deleteFish } from '../controllers/FishController.mjs'; // Use named imports

const router = express.Router();

// Define __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route to handle fish creation with image upload
router.post('/fish', createFish);
router.get('/fish', getFish);
router.get('/fish/:id', getFishById);
router.delete('/fish/:id', deleteFish);

export default router;