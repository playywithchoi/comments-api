// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 서버 설정
const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // POST 데이터 받기

// MongoDB 연결
const MONGODB_URI = process.env.MONGODB_URI; // .env 파일에서 환경 변수 가져오기
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// API 라우터 설정
const commentRouter = require('./api/comments'); // api/comments.js를 불러옴
app.use('/api/comments', commentRouter); // "/api/comments" 경로로 접근하면 commentRouter로 이동

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
