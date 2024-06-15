import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import userRoutes from './routes/userRoutes.mjs';
import lureRoutes from './routes/lureRoutes.mjs';
import catchRoutes from './routes/catchRoutes.mjs';
import fishRoutes from './routes/fishRoutes.mjs';

// Import the whole database setup
import './db/sqlite.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
app.use(bodyParser.json());

// Configure CORS to allow requests from the frontend
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
  console.log('Request Headers:', req.headers);
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', lureRoutes);
app.use('/api', fishRoutes);
app.use('/api', catchRoutes);

// New GeoIP route
app.get('/api/geoip/:ip', async (req, res) => {
  const ip = req.params.ip;
  try {
    const geo = await geoip.lookup(ip);
    if (geo) {
      res.json(geo);
    } else {
      res.status(404).json({ error: 'GeoIP lookup failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node Server is running on port ${PORT}`);
});
