import Synonym from '../models/synonym.js'
import csv from 'csv-parser';
import fs from 'fs';

export const addSynonym = async (req, res) => {
  try {
    const { key, synonyms } = req.body;
    if (!key || !synonyms || !Array.isArray(synonyms)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    await Synonym.create({ key, synonyms });
    res.status(201).json({ message: 'Synonym added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadCSV = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        const bulk = results.map((row) => ({
          key: row.key,
          synonyms: row.synonyms.split(',').map((s) => s.trim()),
        }));

        await Synonym.insertMany(bulk);
        fs.unlinkSync(req.file.path);
        res.status(201).json({ message: 'CSV processed successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'CSV import failed' });
      }
    });
};
