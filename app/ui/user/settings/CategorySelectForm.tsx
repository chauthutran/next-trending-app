'use client';

import { useEffect, useState } from "react";
import * as dbService from "@/libs/mongodb";
import { JSONObject } from "@/libs/definations";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableCategoryItem from "@/ui/category/DraggableCategoryItem";
import { useAuth } from "@/contexts/AuthContext";
import * as Constant from "@/libs/constants";
import { FaSpinner } from "react-icons/fa";


export default function CategorySelectForm() {

	const { user, saveFollowedCategories, processStatus } = useAuth();
	const [categories, setCategories] = useState<JSONObject[] | null>(null);
	const [selectedItems, setSelectedItems] = useState<JSONObject[]>(user!.followedCategories);


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

	useEffect(() => {
		if( processStatus === Constant.RESPONSE_SAVE_USER_CATEGORIES_REQUEST) {
			alert("Settings is saved !");
		}
	}, [processStatus]);

	const saveSelectedItems = async() => {
		await saveFollowedCategories(user!._id, selectedItems);
	}

	const moveCategory = (fromIndex: number, toIndex: number) => {
		const updatedCategories = [...categories!];
		const [movedCategory] = updatedCategories.splice(fromIndex, 1);
		updatedCategories.splice(toIndex, 0, movedCategory);
		setCategories(updatedCategories);
	};


	if (categories === null) return (<div>Loading ... </div>);

	return (
		<div className="flex flex-col bg-white">
			<DndProvider backend={HTML5Backend}>
				<div className="p-4 grid grid-cols-5 gap-5">
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

				{processStatus == Constant.RESPONSE_SAVE_USER_CATEGORIES_REQUEST && <FaSpinner className="ml-auto h-5" size={20} />}
			</button>
		</div>
	)
}