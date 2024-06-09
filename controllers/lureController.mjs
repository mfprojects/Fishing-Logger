import Lure from '../models/lureModel.mjs';

// Create a new lure
export const createLure = (req, res) => {
  const { typeOfLure } = req.body;
  const lureImagePath = req.file ? `uploads/${req.file.filename}` : ''; // Use relative path

  console.log('File:', req.file); // Debugging log
  console.log('Lure Image Path:', lureImagePath); // Debugging log

  Lure.create(typeOfLure, lureImagePath, (err, lure) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(lure);
    }
  });
};

// Get all lures
export const getLures = (req, res) => {
  Lure.getAll((err, lures) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(lures);
    }
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
  const lureImagePath = req.file ? req.file.path : null;

  Lure.update(id, typeOfLure, lureImagePath, (err, lure) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!lure) {
      return res.status(404).json({ error: 'Lure not found' });
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
    res.status(200).json({ message: 'Lure deleted' }); //Changed from 204 to 200 with message
  });
};


export default {
  createLure,
  getLures,
  getLureById,
  updateLure,
  deleteLure
};