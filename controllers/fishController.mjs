import Fish from '../models/fishModel.mjs';

// Create a new fish
export const createFish = (req, res) => {
  const { typeOfFish, size, weight, lure_id} = req.body;
  const fishImagePath = req.file ? `uploads/${req.file.filename}` : ''; // Use relative path

  console.log('File:', req.file); // Debugging log
  console.log('Fish Image Path:', fishImagePath); // Debugging log

  Fish.create(typeOfFish, size, weight, lure_id, fishImagePath, (err, fish) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else { //No need for else but looks more informative imo
    res.status(201).json(fish);
  }
  });
};

// Get all lures
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
  const { typeOfFish, size, weight, lure_id} = req.body;

  const fishImagePath = req.file ? `uploads/${req.file.filename}` : ''; 

  Fish.update(id, typeOfFish, size, weight, lure_id, fishImagePath, (err, fish) => {
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
    res.status(200).json({ message: 'Fish deleted' });
  });
};


export default {
  createFish,
  getFish,
  getFishById,
  updateFish,
  deleteFish};