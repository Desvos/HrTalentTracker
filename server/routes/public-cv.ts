import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { storage } from '../storage';
import Tesseract from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';

const router = Router();

// Configurazione di multer per il salvataggio dei file
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/public');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Funzione per estrarre il testo da un'immagine
async function extractTextFromImage(imagePath: string): Promise<string> {
  const worker = await Tesseract.createWorker('ita');
  const { data: { text } } = await worker.recognize(imagePath);
  await worker.terminate();
  return text;
}

// Funzione per estrarre il testo da un PDF
async function extractTextFromPDF(pdfPath: string): Promise<string> {
  const pdfBytes = await fs.promises.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  // Qui dovresti implementare l'estrazione del testo dal PDF
  // Per ora restituiamo una stringa vuota
  return '';
}

// Endpoint per il caricamento pubblico del CV
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    const file = req.file;

    // Estrai il testo dal file
    let extractedText = '';
    if (file.mimetype.includes('image')) {
      extractedText = await extractTextFromImage(file.path);
    } else if (file.mimetype.includes('pdf')) {
      extractedText = await extractTextFromPDF(file.path);
    }

    // Salva i dati nel database
    const cv = await storage.createPublicCV({
      firstName,
      lastName,
      originalFileName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype,
      fileSize: file.size,
      extractedData: {
        text: extractedText,
        // Qui puoi aggiungere altri dati estratti
      }
    });

    res.json(cv);
  } catch (error) {
    console.error('Error during CV upload:', error);
    res.status(500).json({ error: 'Error during CV upload' });
  }
});

export default router; 