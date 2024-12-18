import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/mongodb.js';
import commentRoutes from './api/comments.js';
import path from 'path'; // path 모듈 추가

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public'))); // 'public' 폴더에서 정적 파일 제공

// Routes
app.use('/api/comments', commentRoutes);

// Database Connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
