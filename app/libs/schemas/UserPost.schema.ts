import mongoose, { Schema, Document } from 'mongoose';

const UserPostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // URL to the image
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    unlikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const UserPost = mongoose.models.UserPost || mongoose.model("UserPost", UserPostSchema);

export default UserPost;
