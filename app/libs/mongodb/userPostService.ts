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
		const categories = await UserPost.find().populate("author")
			.sort({createdAt: -1})
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
				const result = await cloudinary.v2.uploader.upload(payload.imageFile, {
				  folder: "trending",
				});
				imageUrl = result.secure_url;
			  } catch (error) {
				console.error('Error uploading to Cloudinary:', error);
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
