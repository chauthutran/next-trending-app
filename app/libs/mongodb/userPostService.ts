"use server";

import { JSONObject } from "@/libs/definations";
import connectToDatabase from "./db";
import * as Utils from "@/libs/utils";
import UserPost from "../schemas/UserPost.schema";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import User from "../schemas/User.schema";

// Configure Cloudinary
cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ITEMS_PER_PAGE = 10;

export async function fetchPosts(pageNo: number): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const skip = (Number(pageNo) - 1) * ITEMS_PER_PAGE;
		await User.find();
		const categories = await UserPost.find()
			.populate("author")
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(ITEMS_PER_PAGE);

		return { status: "success", data: Utils.cloneJSONObject(categories) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function createPost(payload: JSONObject) {
	try {
		await connectToDatabase();

		// Upload image to Cloudinary if provided
		let imageUrl = "";
		if (payload.imageFile) {
			try {
				const result = await cloudinary.v2.uploader.upload(
					payload.imageFile,
					{
						folder: "trending",
					}
				);
				imageUrl = result.secure_url;
			} catch (error) {
				console.error("Error uploading to Cloudinary:", error);
			}
		}

		const categoryObjectIdList = payload.categories.map(
			(categoryId: string) => new mongoose.Types.ObjectId(categoryId)
		); // Extract ObjectIds

		// Create new post
		const authorObjectId = new mongoose.Types.ObjectId(payload.authorId);
		const postData = {
			title: payload.title,
			content: payload.content,
			image: imageUrl,
			author: authorObjectId,
			categories: categoryObjectIdList,
		};
		const result = await UserPost.create(postData);

		return { status: "success", data: Utils.cloneJSONObject(result) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function updateLikeUnlike ( postId: string, userId: string, action: "like" | "unlike" ) {
	try {
		await connectToDatabase();

		// Find the post by ID
		const post = await UserPost.findById(postId);

		if (!post) {
			throw new Error("Post not found");
		}

		const hasLiked = post.likes.includes(userId);
		const hasUnliked = post.unlikes.includes(userId);

		
		if (action === "like") {
			if (hasLiked) {
				// If the user has already liked the post, remove the like
				const result = await UserPost.findByIdAndUpdate(
					postId,
					{ $pull: { likes: userId } },
					{ new: true }
				).populate("author");
				
				return { status: "success", data: Utils.cloneJSONObject(result) };
			} else {
				// Add like and remove unlike if the user has unliked the post
				const result = await UserPost.findByIdAndUpdate(
					postId,
					{
						$addToSet: { likes: userId }, // Ensure the user is added to likes
						$pull: { unlikes: userId }, // Ensure the user is removed from unlikes
					},
					{ new: true }
				).populate("author");
				return { status: "success", data: Utils.cloneJSONObject(result) };
			}
		} else if (action === "unlike") {
			if (hasUnliked) {
				// If the user has already unliked the post, remove the unlike
				const result = await UserPost.findByIdAndUpdate(
					postId,
					{ $pull: { unlikes: userId } },
					{ new: true }
				).populate("author");
				return { status: "success", data: Utils.cloneJSONObject(result) };
			} else {
				// Add unlike and remove like if the user has liked the post
				const result = await UserPost.findByIdAndUpdate(
					postId,
					{
						$addToSet: { unlikes: userId }, // Ensure the user is added to unlikes
						$pull: { likes: userId }, // Ensure the user is removed from likes
					},
					{ new: true }
				).populate("author");
				return { status: "success", data: Utils.cloneJSONObject(result) };
			}
		}
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
};



export async function updateLikeUnlikeList () {
	try {
		await connectToDatabase();

		const userIdArray = [
			"6704ba2d7d249859d40c35ce",
			"670633038c6acce24c80442e",
			"670633038c6acce24c80442f",
			"670633038c6acce24c804430",
			"670633038c6acce24c804431",
			"670633038c6acce24c804432",
			"670633038c6acce24c804433",
			"670633038c6acce24c804434",
			"670633038c6acce24c804435",
			"670633038c6acce24c804436",
			"670633038c6acce24c804437",
			"670633038c6acce24c804438",
			"670633038c6acce24c804439",
			"670633038c6acce24c80443a",
			"670633038c6acce24c80443b"]

		// Find the post by ID
		const posts = await UserPost.find();

		for( var i=0; i< posts.length; i++ ) {
			const post = posts[i];
			// const ramdomAction = getRandomItem(["likes","unlikes"]);
			
			const randomUserIdlist = getRandomSublist(userIdArray).map((item) => new mongoose.Types.ObjectId(item));
			post.likes = randomUserIdlist;

			await UserPost.findByIdAndUpdate(new mongoose.Types.ObjectId(post._id), post);
		}


		console.log("SUCCESS");

	} catch (error: any) {
		console.log("ERROR", error);
	}
};

function getRandomSublist(array: string[]) {
	const randomLength = Math.floor(Math.random() * array.length) + 1; // Random length between 1 and array length
	const shuffledArray = array.sort(() => 0.5 - Math.random()); // Shuffle the array to get random items
	return shuffledArray.slice(0, randomLength); // Slice the array to get the sublist
  }

  function getRandomItem(array: string[]) {
	const randomIndex = Math.floor(Math.random() * array.length); // Random index between 0 and array length - 1
	return array[randomIndex]; // Return the item at the random index
  }