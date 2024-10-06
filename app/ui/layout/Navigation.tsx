'use client';

import { JSONObject } from "@/libs/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/libs/mongodb";

export default function Navigation({ handleOnItemClick }: { handleOnItemClick: (category: JSONObject) => void }) {

	const [categories, setCategories] = useState<JSONObject[] | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchCategories = async () => {
		setLoading(true);
		const response = await dbService.fetchCategories();
		setCategories(response.data);

		setLoading(false);
	};


	useEffect(() => {
		fetchCategories();
	}, []);

	if (categories === null) return (<div>Loading ...</div>);

	// const gridClass = `grid grid-cols-${categories.length} gap-4`; // Customize gap as needed


	return (
		// <nav className={` ${gridClass}`}>
		<nav className="flex w-full space-x-4 items-start text-white">
			{categories!.map((category, index) => (
				<button
					key={index}
					className="flex-1 flex flex-col items-center justify-start space-y-1"
					onClick={() => handleOnItemClick(category)}
				>
					<div className="text-lg rounded-full border border-white bg-[#016682] w-fit px-3 py-2 shadow-lg hover:bg-peachy-keen hover:shadow-red-600 transition-colors duration-300">
						{category.icon}
					</div>
					{/* <div className="text-2xl">{category.icon}</div> */}
					<div className="text-xs font-semibold">{category.name}</div>
				</button>
			))}
		</nav>

	)
}