import connectDB from '../../utils/mongodb.js';
import Comment from '../../models/comment.js';  // 경로 수정


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const comments = await db.collection('comments').find({}).toArray();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
      }

      const newComment = new Comment({ text });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: 'Error saving comment', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
