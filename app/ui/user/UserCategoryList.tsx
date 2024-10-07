'use client';

import { JSONObject } from "@/libs/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/libs/mongodb";
import { useAuth } from "@/contexts/AuthContext";

export default function Navigation({ handleOnItemClick }: { handleOnItemClick: (category: JSONObject) => void }) {

	const { user } = useAuth();
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
	
	return (
		<div className="grid grid-cols-5 w-full gap-4 items-start text-black">
			{user!.followedCategories.map((category: JSONObject, index: number) => (
				<button
					key={index}
					className="flex-1 flex flex-col items-center justify-start space-y-1 bg-white shadow-lg rounded-md border-light-pink p-1"
					onClick={() => handleOnItemClick(category)}
				>
					<div className="text-lg w-fit px-3 py-2 transition-colors duration-300">
						<div className="category-icon">
							<div dangerouslySetInnerHTML={{ __html: category.icon }} />
						</div>
					</div>
					<div className="text-xs font-semibold">{category.name}</div>
				</button>
			))}
		</div>

	)
}