import { JSONObject } from '@/libs/definations';
import React, { useEffect, useState } from 'react';


const NEWS_API_KEY = '14e39864eded437e9dd5bdcca0a63409';


export default function ArticleList({ category }:{category: JSONObject}) {

	const [articles, setArticles] = useState<JSONObject[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchArticles = async () => {
		setLoading(true);
		const url = `https://newsapi.org/v2/everything?q=${category.name}&apiKey=${NEWS_API_KEY}`;

		const response = await fetch(url);
		const data = await response.json();

		const results = data.articles.filter((item: JSONObject) => item.content !== "[Removed]");
		setArticles(results);
		setLoading(false);
	}


    useEffect(() => {
		fetchArticles();
	}, [category])


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {articles.map((article, index) => (<div key={index} >
                    {article.content !== "[Removed]" && <div className="bg-white border rounded-lg shadow-md overflow-hidden">
                        <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{article.title}</h2>
                            <p className="text-gray-600">{article.description}</p>
                            <p className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">Source: {article.source.name}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-500 hover:underline">
                                Read more
                            </a>
                        </div>
                    </div>}
                </div>
            ))}
        </div>
    );
};
