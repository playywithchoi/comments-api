const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// CORS 설정
app.use(cors());
app.use(express.json()); // JSON 요청 바디 파싱

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// 댓글 스키마 정의
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 댓글 모델 정의
const Comment = mongoose.model('Comment', commentSchema);

// GET 요청: 모든 댓글 가져오기
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: '댓글 목록 가져오기 실패', error: err });
  }
});

// POST 요청: 댓글 저장하기
app.post('/api/comments', async (req, res) => {
  const newComment = new Comment({
    text: req.body.text
  });

  try {
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    res.status(500).json({ message: '댓글 저장 중 오류', error: err });
  }
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
