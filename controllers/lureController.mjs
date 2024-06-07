import Lure from '../models/lureModel.mjs';

// Create a new lure
export const createLure = (req, res) => {
  const { typeOfLure } = req.body;
  console.log('Received request to create lure:', typeOfLure); // Debugging log

  Lure.create(typeOfLure, (err, lure) => {
    if (err) {
      console.error('Failed to create lure:', err); // Debugging log
      return res.status(500).json({ error: err.message });
    }
    console.log('Lure created:', lure); // Debugging log
    res.status(201).json(lure);
  });
};

// Get a lure by ID
export const getLureById = (req, res) => {
  const { id } = req.params;

  Lure.findById(id, (err, lure) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!lure) {
      return res.status(404).json({ error: 'Lure not found' });
    }
    res.status(200).json(lure);
  });
};

// Update a lure
export const updateLure = (req, res) => {
  const { id } = req.params;
  const { typeOfLure } = req.body;

  Lure.update(id, typeOfLure, (err, lure) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!lure) {
      return res.status(404).json({ error: 'lure not found' });
    }
    res.status(200).json(lure);
  });
};

// Delete a lure
export const deleteLure = (req, res) => {
  const { id } = req.params;

  Lure.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).json({ message: 'Lure deleted' });
  });
};

export default {
  createLure
};