import User from '../models/userModel.mjs';

// Create a new user
export const createUser = (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  User.create(name, email, password, (err, user) => {
    if (err) {
      // Handle specific errors (e.g., duplicate email, validation errors)
      if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Failed to create user' });
    }
    res.status(201).json(user);
  });
};

// Get a user by ID
export const getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve user' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  });
};