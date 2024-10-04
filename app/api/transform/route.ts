import * as Utils from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "@huggingface/transformers";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGING_FACE_WEBSITE);

export async function POST(request: NextRequest) {
	try {
		const { prompt } = await request.json();

		// const prompt = "Can you provide the top three trends in food and drink for 2024, specifically focusing on popular styles, ingredients, or culinary innovations?";
		const response = await hf.textGeneration({
			model: "EleutherAI/gpt-neo-2.7B", // You can explore free models on Hugging Face
			inputs: prompt,
			parameters: {
				max_new_tokens: 500, // Increase to allow for a more detailed response
				temperature: 0.7, // Adjust to balance creativity and coherence
				top_p: 0.9, // Control the diversity of word choices
			},
		});

		let resultText = response.generated_text.split(prompt).join("");
		return NextResponse.json({ data: Utils.removeLastSentence(resultText) }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ error: Utils.getErrMessage(err) },
			{ status: 200 }
		);
	}
}
