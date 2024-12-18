import express from 'express';
import Comment from '../models/comment.js'; // comment 모델 경로

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "댓글 목록을 가져오는 데 실패했습니다." });
  }
});

router.post('/', async (req, res) => {
  const { name, content } = req.body;
  try {
    const newComment = new Comment({ name, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "댓글 추가에 실패했습니다." });
  }
});

export default router;
