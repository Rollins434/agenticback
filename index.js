import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import synonymRoutes from './routes/synonymRoutes.js';

const app = express();

connectDB();
app.use(cors()); // Handle cross-origin requests
app.use(express.json()); // Parse JSON bodies (application/json)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (form submissions)

app.use('/api', synonymRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
