'use client';

import { JSONObject } from "@/libs/definations"
import { useEffect, useState } from "react"


export default function TrendSummary({ category }: { category: JSONObject }) {

    const [summary, setSummary] = useState<string[] | null>(null);
	
	const generateQuestion = () => {
		const curYear = new Date().getFullYear();
		const categoryChilrenName = category.children.map((item: JSONObject) => item.name );
		let question = `What are the top three trends in ${category.name} for  ${curYear}? `;
		question += ` Focus on ${categoryChilrenName.join(", ")}?`;

		return question;
	}

	const question = generateQuestion();

	const fetchSummaries = async () => {
		
		const response = await fetch('/api/transform', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt: question }),
		});
		const data = await response.json();
		const results = data.data.split("\n");
		console.log(results);
		setSummary(results);
	};

    useEffect(() => {
		setSummary([]);
		fetchSummaries();
	}, [category])


	if ( summary === null ) return (<div></div>);
console.log("summary", summary);
    return (
		<>
			{summary.length === 0 && <div>Loading summary ...</div>}
			{summary.length == 1 && summary[0] !== "" && <div className="m-3 p-3 border border-gray-300 rounded shadow-lg">
					<h2 className="text-xl my-2">{question}</h2>
					<div>
						{summary.map((str, idx) => (
							<p key={`summary_${idx}`}>{str}</p>
						))}
					</div>
				</div>}
			{summary.length > 1 && <div className="m-3 p-3 border border-gray-300 rounded shadow-lg">
					<h2 className="text-2xl">{question}</h2>
					<div>
						{summary.map((str, idx) => (
							<p key={`summary_${idx}`}>{str}</p>
						))}
					</div>
				</div>}
		</>
    )
}