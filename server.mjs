import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.mjs';
import fishingTripRoutes from './routes/fishingTripRoutes.mjs';
import fishRoutes from './routes/fishRoutes.mjs';
import lureRoutes from './routes/lureRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the database setup
import './db/sqlite.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
  next();
});

app.use('/api', userRoutes);
app.use('/api', fishingTripRoutes);
app.use('/api', fishRoutes);
app.use('/api', lureRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node Server is running on port ${PORT}`);
});