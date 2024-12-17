// server.js (서버 코드)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/commentsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// 댓글 스키마 정의
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

// 댓글 모델
const Comment = mongoose.model('Comment', commentSchema);

app.use(cors());
app.use(express.json());

// 댓글 목록 가져오기 API
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find(); // DB에서 댓글 가져오기
    res.json(comments); // 댓글 목록 반환
  } catch (error) {
    res.status(500).json({ message: '댓글을 가져오는 데 실패했습니다.' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
