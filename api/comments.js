const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment'); // 댓글 모델 경로

const app = express();
app.use(cors()); // 모든 도메인에서의 요청을 허용

app.use(express.json()); // 요청 본문을 JSON으로 파싱

// 댓글 목록 가져오기 API
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find(); // DB에서 댓글 가져오기
    res.json(comments); // 댓글 목록 반환
  } catch (error) {
    res.status(500).json({ message: '댓글을 가져오는 데 실패했습니다.' });
  }
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
