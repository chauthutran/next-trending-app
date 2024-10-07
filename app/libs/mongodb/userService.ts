"use server";

import { JSONObject } from "../definations";
import connectToDatabase from "./db";
import User from "../schemas/User.schema";
import * as Encrypt from "./encryptPassword";
import * as Utils from "@/libs/utils";
import mongoose from "mongoose";

export async function login({
	email,
	password,
}: JSONObject): Promise<JSONObject> {
	try {
		await connectToDatabase();
		const searchResult = await User.find({ email }).populate("followedCategories");
console.log(searchResult);
		// Find the users with the password if there is password in parametters
		let matchedUser: JSONObject | null = null;
		for (let i = 0; i < searchResult.length; i++) {
			const user = searchResult[i];
			const matched = await Encrypt.comparePassword(
				password!,
				user.password
			);
			if (matched) {
				matchedUser = user;
				break;
			}
		}

		if (matchedUser === null) {
			return { status: "fail", message: "Username/Password is wrong" };
		}

		// const teamMemberIdObjs = matchedUser.teamMembers.map((id: string) => new mongoose.Types.ObjectId(id));
		// const teamMembers = await User.find({ _id: { $in: teamMemberIdObjs } });
		// matchedUser.teamMembers = teamMembers;

		return { status: "success", data: Utils.cloneJSONObject(matchedUser) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function register(userData: JSONObject): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const password = userData.password;
		userData.password = await Encrypt.hashPassword(password);

		const newUser = await User.create(userData);
		return { status: "succcess", data: Utils.cloneJSONObject(newUser) };
	} catch (error: any) {
		// return ({status: "error", message: error.message});
		if (error instanceof mongoose.Error.ValidationError) {
			return {
				status: "error",
				message: "Validation Error:" + error.message,
			};
		} else if (error instanceof mongoose.Error.CastError) {
			return { status: "error", message: "Cast Error:" + error.message };
		} else if (error.code === 11000) {
			// Duplicate key error code
			return { status: "error",  message: "Duplicate Key Error:" + error.message };
		} else {
			return { status: "error", message: "UnknownError:" + error.message };
		}
	}
}

export async function saveFollowedCategories(
	userId: string,
	categories: JSONObject[]
) {
	try {
		await connectToDatabase();

		const userObjectId = new mongoose.Types.ObjectId(userId);
		const categoryObjectIdList = categories.map(
			(category) => new mongoose.Types.ObjectId(category._id)
		); // Extract ObjectIds

		const updatedUser = await User.findByIdAndUpdate(
			userObjectId,
			{ followedCategories: categoryObjectIdList }, // Replaces the current followedCategories
			{ new: true, runValidators: true } // Return the updated document
		);
		
		return { status: "success", data: Utils.cloneJSONObject(updatedUser) };
	} catch (error: any) {
		return { status: "error", message: "UnknownError:" + error.message };
	}
}
