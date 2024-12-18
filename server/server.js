// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

// CORS 설정 (클라이언트와 다른 도메인일 경우 필요)
app.use(cors());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// 모델 정의
const Comment = mongoose.model('Comment', new mongoose.Schema({
  content: String,
}));

// 댓글 목록을 가져오는 GET 요청 처리
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find();  // 댓글 목록을 가져옴
    res.json(comments);
  } catch (error) {
    console.error('댓글 목록을 가져오는 중 오류 발생:', error);
    res.status(500).json({ error: '댓글 목록을 가져오는 데 실패했습니다.' });
  }
});

// 서버 포트 설정 (환경 변수에서 가져옴, 기본값은 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
