'use client';

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableCategoryItem from "./DraggableCategoryItem";
import * as dbService from "@/libs/mongodb";
import { JSONObject } from "@/libs/definations";


const CategoryList = ({ handleOnItemClick }: { handleOnItemClick: (category: JSONObject) => void }) => {

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


	const moveCategory = (fromIndex: number, toIndex: number) => {
		const updatedCategories = [...categories!];
		const [movedCategory] = updatedCategories.splice(fromIndex, 1);
		updatedCategories.splice(toIndex, 0, movedCategory);
		setCategories(updatedCategories);
	};

	if (categories === null) return (<div>Loading ...</div>);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="p-4 grid grid-cols-5 gap-5">
				{categories!.map((category, index) => (
					<DraggableCategoryItem key={category.id} category={category} index={index} moveCategory={moveCategory} itemClick={(item) => handleOnItemClick(item)} />
				))}
			</div>
		</DndProvider>
	);
};

export default CategoryList;