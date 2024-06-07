import express from 'express';
import fishingTripController from '../controllers/fishingTripController.mjs';

const router = express.Router();

router.post('/fishingTrips', fishingTripController.createFishingTrip);
router.get('/fishingTrips/:id', fishingTripController.getFishingTripById);

// Additional routes as needed

export default router;