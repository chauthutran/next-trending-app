import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    trendId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trend' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    commentText: String,
    createdAt: { type: Date, default: Date.now },
  });
  
const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default Comment;