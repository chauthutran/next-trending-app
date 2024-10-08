import mongoose from "mongoose";

// To ensure that the Category model is defined and registered before using it in the User model
import Category from './Category.schema';


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }, // 'user', 'admin'
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserPost' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserPost' }],
    unlikedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserPost' }],
    followedCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
  },
  {
      timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;