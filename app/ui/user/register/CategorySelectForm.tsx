'use client';

import { useEffect, useState } from "react";
import * as dbService from "@/libs/mongodb";
import { JSONObject } from "@/libs/definations";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableCategoryItem from "@/ui/category/DraggableCategoryItem";
import { useAuth } from "@/contexts/AuthContext";


export default function CategorySelectForm() {

	const { user, setUser } = useAuth();
	const [categories, setCategories] = useState<JSONObject[] | null>(null);
	const [selectedItems, setSelectedItems] = useState<JSONObject[]>([]);


	const fetchCategories = async () => {
		const response = await dbService.fetchCategories();
		setCategories(response.data);
	};

	const handleCategoryClick = (category: JSONObject) => {
		const isSelected = selectedItems.includes(category);
		let updatedSelectedCategories;

		if (isSelected) {
			updatedSelectedCategories = selectedItems.filter(cat => cat._id !== category._id);
		} else {
			updatedSelectedCategories = [...selectedItems, category];
		}

		setSelectedItems(updatedSelectedCategories);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const saveSelectedItems = async() => {
		const response = await dbService.saveFollowedCategories(user!._id, selectedItems);
		// const response = await dbService.saveFollowedCategories("670235925f2b78d23691af04", selectedItems);
		if( response.status === "success" ) {
			alert("The followed categories are saved !");
		}
		else {
			console.log(response.message);
		}
	}

	const moveCategory = (fromIndex: number, toIndex: number) => {
		const updatedCategories = [...categories!];
		const [movedCategory] = updatedCategories.splice(fromIndex, 1);
		updatedCategories.splice(toIndex, 0, movedCategory);
		setCategories(updatedCategories);
	};


	if (categories === null) return (<div>Loading ... </div>);

	return (
		<>
			<DndProvider backend={HTML5Backend}>
				<div className="p-4 grid grid-cols-3 gap-5">
					{categories!.map((category, index) => (
						<DraggableCategoryItem
							key={category.id}
							category={category}
							index={index}
							moveCategory={moveCategory}
							selected={selectedItems.includes(category)}
							itemClick={(item) => handleCategoryClick(item)}
						/>
					))}
				</div>
			</DndProvider>

			<button 
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
				onClick={() => saveSelectedItems()}
			>
				Save Categories
			</button>
		</>
	)
}