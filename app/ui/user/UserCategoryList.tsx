'use client';

import { JSONObject } from "@/libs/definations";
import { useEffect, useRef, useState } from "react";
import * as dbService from "@/libs/mongodb";
import { useAuth } from "@/contexts/AuthContext";
import { TiMediaPlay, TiMediaPlayReverse } from "react-icons/ti";

export default function Navigation({ handleOnItemClick }: { handleOnItemClick: (category: JSONObject) => void }) {

	const { user } = useAuth();
	const [categories, setCategories] = useState<JSONObject[] | null>(null);
	const [loading, setLoading] = useState(false);
	const scrollRef = useRef<HTMLDivElement | null>(null);


	const fetchCategories = async () => {
		setLoading(true);
		const response = await dbService.fetchCategories();
		setCategories(response.data);

		setLoading(false);
	};

	useEffect(() => {
		fetchCategories();
	}, []);


	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: -150, // Adjust the scroll distance as needed
				behavior: 'smooth',
			});
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: 150, // Adjust the scroll distance as needed
				behavior: 'smooth',
			});
		}
	};


	return (
		<nav className="bg-background-color">
			<div className="relative text-gray-800 bg-dark-slate flex border border-gray-200 items-center py-1">
				<button
					onClick={scrollLeft}
					className="text-bright-lime-green hover:text-highlight-green"
				>
					<TiMediaPlayReverse size={25} />
				</button>

				<div
					ref={scrollRef}
					className="flex flex-1 w-full space-x-5 overflow-x-auto scroll-smooth items-start text-sm text-black scrollbar-custom"
				>
					{user!.followedCategories.map((category: JSONObject, index: number) => (
						<button
							key={index}
							className="flex-shrink-0 flex flex-col items-center justify-start space-y-1 bg-white shadow-lg rounded-md border-light-pink p-1"
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

				<button
					onClick={scrollRight}
					className="text-bright-lime-green hover:text-highlight-green"
				>
					<TiMediaPlay size={25} />
				</button>
			</div>
		</nav>

	)
}