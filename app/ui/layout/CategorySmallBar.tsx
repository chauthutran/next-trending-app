'use client';

import { JSONObject } from "@/libs/definations";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategorySmallBarItem from "./CategorySmallBarItem";

export default function CategorySmallBar({ categories, handleOnItemClick }: { categories: JSONObject[], handleOnItemClick: (category: JSONObject) => void }) {

	const [list, setList] = useState<JSONObject[]>(categories);

	const moveCategory = (fromIndex: number, toIndex: number) => {
		const updatedCategories = [...categories!];
		const [movedCategory] = updatedCategories.splice(fromIndex, 1);
		updatedCategories.splice(toIndex, 0, movedCategory);
		setList(updatedCategories);
	};

	if (categories === null) return (<div>Loading ...</div>);



	return (
		<DndProvider backend={HTML5Backend}>
			 <div className="flex flex-wrap mx-4">
				{list.map((category, index) => (
					<CategorySmallBarItem key={category.id} category={category} index={index} moveCategory={moveCategory} itemClick={(item) => handleOnItemClick(item)} />
				))}
			</div>
		</DndProvider>
	)
}