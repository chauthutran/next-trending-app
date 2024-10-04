"use server";

import { JSONObject } from '@/libs/definations';
import connectToDatabase from "./db";
import Category from "../schemas/Category.schema";
import * as Utils from "@/libs/utils";

export async function fetchCategories(): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const categories = await Category.find({});
		return { status: "success", data: Utils.cloneJSONObject(categories) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}