import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createCatch, getCatchById, getCatch, updateCatch, deleteCatch } from '../controllers/catchController.mjs'; // Use named imports

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
router.post('/catch', upload.single('fishImage'), createCatch);
router.get('/catch', getCatch)
router.get('/catch/:id', getCatchById);
router.put('/catch/:id', upload.single('fishImage'), updateCatch);
router.delete('/catch/:id', deleteCatch);

export default router;