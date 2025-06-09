import express from 'express';
import multer from 'multer';
import { addSynonym, uploadCSV } from '../controllers/synonymController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/synonyms', addSynonym);
router.post('/synonyms/upload', upload.single('file'), uploadCSV);

export default router;
