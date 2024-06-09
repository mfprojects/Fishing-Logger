import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createFish, getFishById, getFish, updateFish, deleteFish } from '../controllers/fishController.mjs'; // Use named imports

const router = express.Router();

// Define __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadsDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
const upload = multer({ storage: storage });

// Route to handle fish creation with image upload
router.post('/fish', upload.single('fishImage'), createFish);
router.get('/fish', getFish)
router.get('/fish/:id', getFishById);
router.put('/fish/:id', upload.single('fishImage'), updateFish);
router.delete('/fish/:id', deleteFish);

export default router;