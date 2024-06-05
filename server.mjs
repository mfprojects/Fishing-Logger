import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.mjs';
import fishingTripRoutes from './routes/fishingTripRoutes.mjs';
import fishRoutes from './routes/fishRoutes.mjs';
import lureRoutes from './routes/lureRoutes.mjs';

// Import the database setup
import './db/sqlite.mjs';

const app = express();
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', fishingTripRoutes);
app.use('/api', fishRoutes);
app.use('/api', lureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});