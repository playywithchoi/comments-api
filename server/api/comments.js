// api/comments.js

const express = require('express');
const Comment = require('../models/comment'); // Comment 모델 불러오기
const router = express.Router();

// 댓글 목록 가져오기
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find(); // MongoDB에서 댓글 데이터 가져오기
    res.json(comments); // JSON 형식으로 반환
  } catch (err) {
    console.error('댓글 목록 가져오기 실패:', err);
    res.status(500).json({ message: '댓글 목록을 가져오는 데 실패했습니다.' });
  }
});

// 댓글 작성하기
router.post('/', async (req, res) => {
  const { text } = req.body; // 클라이언트에서 전달받은 텍스트

  if (!text) {
    return res.status(400).json({ message: '댓글 텍스트가 필요합니다.' });
  }

  const newComment = new Comment({ text });

  try {
    await newComment.save(); // 새 댓글을 MongoDB에 저장
    res.status(201).json(newComment); // 저장된 댓글을 반환
  } catch (err) {
    console.error('댓글 작성 실패:', err);
    res.status(500).json({ message: '댓글 작성에 실패했습니다.' });
  }
});

module.exports = router;
