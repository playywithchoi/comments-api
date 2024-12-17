// server.js
require('dotenv').config(); // .env 파일을 로드

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 미들웨어 설정
app.use(cors()); // CORS 허용
app.use(express.json()); // JSON 파싱

// 댓글 스키마 설정
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// API 엔드포인트 (댓글 가져오기)
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: '댓글을 가져오는 데 실패했습니다.' });
  }
});

// API URL 엔드포인트 (클라이언트에 API URL 제공)
app.get('/api/url', (req, res) => {
  res.json({ apiUrl: process.env.API_URL });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
