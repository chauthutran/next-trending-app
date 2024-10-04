import * as Utils from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";
// import googleTrends from 'google-trends-api';


export async function GET(request: NextRequest) {
	try {
		const res = await fetch( `${process.env.WEBSITE_GOOGLE_TRENDING_BASE_URL}/explore/pickers/category?hl=en-US&tz=-540`, {
			method: "GET"
		});
		
		let results = await res.text();
		const data = JSON.parse(results.replace(")]}'", ""));

		return NextResponse.json(
			{ data: data.children},
			{ status: 200 }
		);

		// const results = await googleTrends.autoComplete({
		// 	keyword: "fashion"
		// });

		return NextResponse.json({data: JSON.parse(results)}, { status: 200 });

	} catch (err) {
		return NextResponse.json(
			{ error: Utils.getErrMessage(err) },
			{ status: 200 }
		);
	}
}


