require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// CORS 설정 (모든 도메인에서 허용)
app.use(cors());

// JSON 요청을 파싱하도록 설정
app.use(express.json());

// MongoDB 모델 정의
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// MongoDB 연결
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is undefined. Check your .env file.');
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 댓글 가져오기 API
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments' });
  }
});

// 댓글 추가 API
app.post('/api/comments', async (req, res) => {
  const { name, comment } = req.body;
  const newComment = new Comment({ name, comment });

  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error saving comment' });
  }
});

// 서버 시작
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
