import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }, // 'user', 'admin'
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trend' }],
    followedCategories: [{ type: String }],
    activity: [
      {
        trendId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trend' },
        action: String, // 'commented', 'liked'
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
      timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;