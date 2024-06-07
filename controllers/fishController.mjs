import Fish from '../models/fishModel.mjs';

// Create a new fish
export const createFish = (req, res) => {
  const { trip_id, typeOfFish, size, weight, lure_id } = req.body;

  Fish.create(trip_id, typeOfFish, size, weight, lure_id, (err, fish) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(fish);
  });
};

// Get a fish by ID
export const getFishById = (req, res) => {
  const { id } = req.params;

  Fish.findById(id, (err, fish) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!fish) {
      return res.status(404).json({ error: 'Fish not found' });
    }
    res.status(200).json(fish);
  });
};

// Update a fish
export const updateFish = (req, res) => {
  const { id } = req.params;
  const { trip_id, typeOfFish, size, weight, lure_id } = req.body;

  Fish.update(id, trip_id, typeOfFish, size, weight, lure_id, (err, fish) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!fish) {
      return res.status(404).json({ error: 'Fish not found' });
    }
    res.status(200).json(fish);
  });
};

// Delete a fish
export const deleteFish = (req, res) => {
  const { id } = req.params;

  Fish.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).json({ message: 'Fish deleted' });
  });
};