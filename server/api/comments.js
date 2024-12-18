import express from 'express';
import Comment from '../models/comment.js';

const router = express.Router();

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving comment', error: error.message });
  }
});

export default router;
