import Location from '../models/locationModel.mjs';

// Create a new location
export const createLocation = (req, res) => {
  const { latitude, longitude, locationName } = req.body;

  Location.create(latitude, longitude, locationName, (err, location) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(location);
    }
  });
};

// Get all locations
export const getLocations = (req, res) => {
  Location.getAll((err, locations) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(locations);
    }
  });
};

// Get a location by ID
export const getLocationById = (req, res) => {
  const { id } = req.params;

  Location.findById(id, (err, location) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json(location);
  });
};

// Update a location
export const updateLocation = (req, res) => {
  const { id } = req.params;
  const { latitude, longitude, locationName } = req.body;

  Location.update(id, latitude, longitude, locationName, (err, location) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json(location);
  });
};

// Delete a location
export const deleteLocation = (req, res) => {
  const { id } = req.params;

  Location.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Location deleted' });
  });
};

export default {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
};
