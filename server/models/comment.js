import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: String,
  content: String,
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
