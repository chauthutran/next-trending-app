import * as Utils from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";
import googleTrends from "google-trends-api";

// https://trends.google.com/trends/api/explore/pickers/category?hl=en-US&tz=-540
// const NEWS_API_KEY = '14e39864eded437e9dd5bdcca0a63409';

// Get category list
export async function POST(request: NextRequest) {
	try {
		// const results = await googleTrends.dailyTrends({
		// 	geo: '',  // You can change 'US' to another region, like 'WORLD'
		// 	trendDate: new Date()
		// });

		const { keywords } = await request.json();

		const results = await googleTrends.interestOverTime({
			keyword: keywords,
			startTime: new Date("2024-01-01"),
			endTime: new Date("2024-12-31"),
			// geo: 'US',
		});
		
		// const results = await googleTrends.relatedTopics({
		// 	keyword: 'fashion',
		// 	geo: 'US', // Specify 'US' or 'WORLD' for global data
		// 	startTime: new Date('2023-01-01'), // Specify start time for trends
		//   });

		return NextResponse.json(
			{ data: JSON.parse(results) },
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ error: Utils.getErrMessage(err) },
			{ status: 200 }
		);
	}
}

// OpenAI
// const fetchTrendInsights = async () => {
// 	const configuration = new Configuration({
// 		apiKey: "YOUR_OPENAI_API_KEY",
// 	});
// 	const openai = new OpenAIApi(configuration);

// 	const prompt = `Give me insights on the latest fashion trends, such as what style people are liking, and jewelry trends.`;

// 	const response = await openai.createCompletion({
// 		model: "text-davinci-003",
// 		prompt,
// 		max_tokens: 100,
// 	});

// 	return response.data.choices[0].text;
// };
