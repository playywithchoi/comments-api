import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/mongodb.js';
import commentRoutes from './api/comments.js';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/comments', commentRoutes);

// Database Connection
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
