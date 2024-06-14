import CatchRecord from '../models/catchModel.mjs';

// Create a new catch
export const createCatch = (req, res) => {
  const { fish_id, size, weight, lure_id, catchDateTime, latitude, longitude, locationName } = req.body;
  const fishImagePath = req.file ? `uploads/${req.file.filename}` : ''; // Use relative path

  console.log('DateTime:', req.body.catchDateTime); // Debugging log
  console.log('File:', req.file); // Debugging log
  console.log('fishImage Path:', fishImagePath); // Debugging log

  CatchRecord.create(fish_id, size, weight, lure_id, catchDateTime, locationName, latitude, longitude, fishImagePath, (err, newCatch) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else { // No need for else but looks more informative imo
      res.status(201).json(newCatch);
    }
  });
};

// Get all catches
export const getCatch = (req, res) => {
  CatchRecord.getAll((err, allCatches) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allCatches);
    }
  });
};

// Get a catch by ID
export const getCatchById = (req, res) => {
  const { id } = req.params;

  CatchRecord.findById(id, (err, foundCatch) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!foundCatch) {
      return res.status(404).json({ error: 'Catch not found' });
    }
    res.status(200).json(foundCatch);
  });
};

// Update a catch
export const updateCatch = (req, res) => {
  const { id } = req.params;
  const { fish_id, size, weight, lure_id } = req.body;
  const fishImagePath = req.file ? `uploads/${req.file.filename}` : '';

  CatchRecord.update(id, fish_id, size, weight, lure_id, fishImagePath, (err, updatedCatch) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!updatedCatch) {
      return res.status(404).json({ error: 'Catch not found' });
    }
    res.status(200).json(updatedCatch);
  });
};

// Delete a catch
export const deleteCatch = (req, res) => {
  const { id } = req.params;

  CatchRecord.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Catch deleted' });
  });
};

export default {
  createCatch,
  getCatch,
  getCatchById,
  updateCatch,
  deleteCatch
};
