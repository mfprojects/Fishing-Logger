//Måtte skrive om her da __dirname ikke er supportert natively i ES moduler. Hodebry.
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLocation, getLocation, getLocationById, updateLocation, deleteLocation } from '../controllers/locationController.mjs'; // Use named imports

const router = express.Router();

// Define __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);

// Route to handle fish creation with image upload
router.post('/location', createLocation);
router.get('/location', getLocation);
router.get('/location/:id', getLocationById);
router.delete('/location/:id', deleteLocation);

export default router;