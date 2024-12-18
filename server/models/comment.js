// models/comment.js

const mongoose = require('mongoose');

// 댓글 스키마 정의
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // 댓글 텍스트는 필수
    trim: true, // 공백 제거
  },
}, { timestamps: true }); // 댓글 작성 시간 자동 생성

// 댓글 모델 생성
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
