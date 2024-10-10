"use server";

import { JSONObject } from "@/libs/definations";
import connectToDatabase from "./db";
import * as Utils from "@/libs/utils";
import UserPost from "../schemas/UserPost.schema";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import User from "../schemas/User.schema";


export async function fetchComments(userPostId: string): Promise<JSONObject> {
	try {
		await connectToDatabase();

		await User.find();
		const categories = await UserPost.find({userPost: new mongoose.Types.ObjectId(userPostId)})
			.sort({ createdAt: -1 })

		return { status: "success", data: Utils.cloneJSONObject(categories) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function createComment(payload: JSONObject) {
	try {
		await connectToDatabase();

		payload.author = new mongoose.Types.ObjectId(payload.author);
		payload.userPost = new mongoose.Types.ObjectId(payload.userPost);

		const result = await UserPost.create(payload);

		return { status: "success", data: Utils.cloneJSONObject(result) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function updateComment(payload: JSONObject) {
	try {
		await connectToDatabase();

		const result = await UserPost.findByIdAndUpdate(
			new mongoose.Types.ObjectId(payload._id),
			{
			  $set: {
				content: payload.content
			  }
			},
			{ new: true } // return updated document
		)

		return { status: "success", data: Utils.cloneJSONObject(result) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function deleteComment(userPostId: string) {
	try {
		await connectToDatabase();

		const result = await UserPost.findByIdAndDelete(new mongoose.Types.ObjectId(userPostId));
		
		return { status: "success", data: Utils.cloneJSONObject(result) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}
