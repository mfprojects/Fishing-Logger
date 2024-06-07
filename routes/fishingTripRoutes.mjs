import express from 'express';
import { createFishingTrip, getFishingTripById } from '../controllers/fishingTripController.mjs'; // Use named imports

const router = express.Router();

router.post('/fishing-trips', createFishingTrip);
router.get('/fishing-trips/:id', getFishingTripById);

// Additional routes as needed

export default router;
