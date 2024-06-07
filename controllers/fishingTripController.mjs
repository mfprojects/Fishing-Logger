import FishingTrip from '../models/fishingTripModel.mjs';

// Create a new fishing trip
export const createFishingTrip = (req, res) => {
  const { user_id, date, location, weather } = req.body;

  FishingTrip.create(user_id, date, location, weather, (err, fishingTrip) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(fishingTrip);
  });
};

// Get a fish by ID
export const getFishingTripById = (req, res) => {
  const { id } = req.params;

  FishingTrip.findById(id, (err, fishingTrip) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!fishingTrip) {
      return res.status(404).json({ error: 'Fishing Trip not found' });
    }
    res.status(200).json(fishingTrip);
  });
};

// Update a fish
export const updateFishingTrip = (req, res) => {
  const { id } = req.params;
  const { user_id, date, location, weather } = req.body;

  FishingTrip.update(id, user_id, date, location, weather, (err, fishingTrip) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!fishingTrip) {
      return res.status(404).json({ error: 'Fishing Trip not found' });
    }
    res.status(200).json(fishingTrip);
  });
};

// Delete a fish
export const deleteFish = (req, res) => {
  const { id } = req.params;

  FishingTrip.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).json({ message: 'Fishing Trip deleted' });
  });
};