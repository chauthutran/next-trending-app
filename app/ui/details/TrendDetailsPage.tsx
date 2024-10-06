'use client';


import { JSONObject } from '@/libs/definations';
import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import TrendSummary from './TrendSummary';
import ImageGallery from './ImageGallery';


export default function TrendByCategory({ category }: { category: JSONObject }) {

	// const [trendData, setTrendData] = useState('');
	const [trends, setTrends] = useState<JSONObject[]>([]);
	const [loading, setLoading] = useState(false);

	// 	const fetchTrends = async () => {
	// 	  setLoading(true);
	// 	  const res = await fetch('/api/trending', {
	// 	    method: 'POST',
	// 	    headers: {
	// 	      'Content-Type': 'application/json',
	// 	    },
	// 	    body: JSON.stringify({ prompt: 'Latest fashion trends in 2024' }),
	// 	  });

	// 	  const data = await res.json();
	// console.log(data);
	// 	// --- dailyTrends
	// 	 setTrends(data.data.default.trendingSearchesDays[0].trendingSearches); // Adjust based on your needs

	// 	  setLoading(false);
	// 	};



	// const fetchTrends = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const categorySubNames = category.children.map((item: JSONObject) => item.name );;
	// 	  const res = await fetch('/api/trending', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ keywords: category.name }),
	// 	  });
	
	// 	  const data = await res.json();
	// 	  console.log("==== data", data);
	// 	  const formattedData = data.data.default.timelineData.map((item: any) => ({
	// 		// time: new Date(item.time).toLocaleDateString(),
	// 		time: new Date(item.time * 1000).toLocaleDateString(),
	// 		// time: item.formattedTime,
	// 		value: item.value[0], // Assuming there's only one value per time period
	// 	  }));
	// 	  setTrends(formattedData);
	// 	} catch (error) {
	// 	  console.error('Error fetching trend data:', error);
	// 	} finally {
	// 	  setLoading(false);
	// 	}
	// };

	// const fetchTrends = async () => {
	// 	const curYear = new Date().getFullYear();
	// 	const response = await fetch('/api/transform', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ prompt: `What are the trending of ${categoryName} for this season ${curYear}?` }),
	// 	});
	// 	const data = await response.json();
	// 	console.log(data);
	// };



	// const fetchArticles = async () => {
	// 	setLoading(true);
	// 	const url = `https://newsapi.org/v2/everything?q=${categoryName}&apiKey=${NEWS_API_KEY}`;

	// 	const response = await fetch(url);
	// 	const data = await response.json();

	// 	const results = data.articles.filter((item: JSONObject) => item.content !== "[Removed]");
	// 	setTrends(results);
	// 	setLoading(false);
	// }

	useEffect(() => {
		// fetchArticles();

		// fetchTrends();
	}, [category])

	return (
		<div>
				{/* <TrendSummary category={category} />
				<ImageGallery category={category} />
				<ArticleList category={category} /> */}


				{/* <ul>
					{trends.map((trend, index) => (
						<li key={index}>
							{trend.title.query}
						</li>
					))}
				</ul> */}


{/* 
<ul>
          {trends.map((data, index) => (
            <li key={index} className="mb-2">
              <strong>{data.time}</strong>: {data.value}
            </li>
          ))}
        </ul> */}

		</div>
	);
}