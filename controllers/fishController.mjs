import Fish from '../models/FishModel.mjs';

// Create a new fish
export const createFish = (req, res) => {
  const { typeOfFish } = req.body;

  Fish.create(typeOfFish, (err, fish) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(fish);
    }
  });
};

// Get all lfish
export const getFish = (req, res) => {
  Fish.getAll((err, fish) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(fish);
    }
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
  const { typeOfFish } = req.body;

  Fish.update(id, typeOfFish, (err, fish) => {
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
    res.status(200).json({ message: 'Fish deleted' }); //Changed from 204 to 200 with message
  });
};


export default {
  createFish,
  getFish,
  getFishById,
  updateFish,
  deleteFish
};