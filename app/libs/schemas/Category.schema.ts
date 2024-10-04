import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
	name: { type: String, require: true }, // e.g., 'Fashion', 'Makeup', 'Books'
	description: { type: String, require: true },
    icon: { type: String, require: true },
	trends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Category =
	mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
