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
		<>
			{user!.followedCategories.length > 0 && <nav className="bg-background-color">
				<div className="relative text-gray-800 flex border-y border-gray-300 items-center">
					<button
						onClick={scrollLeft}
						className="h-[110px] flex items-center justify-center bg-blue-1 text-white"
					>
						<TiMediaPlayReverse size={25} />
					</button>

					<div
						ref={scrollRef}
						className="flex flex-1 w-full overflow-x-hidden scroll-smooth items-start text-sm text-black scrollbar-custom bg-gray-300"
					>
						{user!.followedCategories.map((category: JSONObject, index: number) => (
							<button
								key={index}
								className="flex-shrink-0 flex flex-col px-3 items-center border-x border-gray-200 justify-start bg-white"
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
						className="h-[110px] flex items-center justify-center bg-blue-1 text-white"
					>
						<TiMediaPlay size={25} />
					</button>
				</div>
			</nav>}
		</>
	)
}