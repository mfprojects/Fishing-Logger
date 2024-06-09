//Måtte skrive om her da __dirname ikke er supportert natively i ES moduler. Hodebry.
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createLure, getLures, getLureById, updateLure, deleteLure } from '../controllers/lureController.mjs'; // Use named imports

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

// Route to handle lure creation with image upload
router.post('/lures', upload.single('lureImage'), createLure);
router.get('/lures', getLures);
router.get('/lures/:id', getLureById);
router.put('/lures/:id', upload.single('lureImage'), updateLure);
router.delete('/lures/:id', deleteLure);

export default router;