const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// 댓글 스키마 정의
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

app.get('/api/comments', async (req, res) => {
  try {
    console.log('댓글 목록을 가져오는 요청이 들어왔습니다.'); // 로그 추가
    const comments = await Comment.find();
    console.log('댓글 목록:', comments); // 댓글 목록 출력
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: '댓글 목록을 가져오는 데 실패했습니다.' });
  }
});


// 서버 실행
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
