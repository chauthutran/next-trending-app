import mongoose from "mongoose";

const TrendSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // 'Fashion', 'Makeup', 'Books'
    createdAt: { type: Date, default: Date.now },
    popularityScore: { type: Number, default: 0 },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    votes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        voteType: String, // 'upvote', 'downvote'
      },
    ],
  });
  
  
const Trend = mongoose.models.Trend || mongoose.model('Trend', TrendSchema);

export default Trend;