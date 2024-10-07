'use client';

import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/libs/definations';
import React, { useEffect, useState } from 'react';
import * as dbService from "@/libs/mongodb";
import * as Utils from "@/libs/utils";
import { BiTrashAlt } from 'react-icons/bi';
import { LiaTrashSolid } from 'react-icons/lia';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCategoryItem from '@/ui/category/DraggableCategoryItem';
import { FaSpinner } from 'react-icons/fa';
import * as Constant from "@/libs/constants";



const CategorySelectForm: React.FC = () => {

	const { user, saveFollowedCategories, processStatus } = useAuth();
	const [availableItems, setAvailableItems] = useState<JSONObject[]>([]);
	const [selectedItems, setSelectedItems] = useState<JSONObject[]>(user!.followedCategories);

	const fetchCategories = async () => {
		const response = await dbService.fetchCategories();
		const list = Utils.removeFromArray(response.data, user!.followedCategories, "_id");
		setAvailableItems(list);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		if( processStatus === Constant.RESPONSE_SAVE_USER_CATEGORIES_REQUEST) {
			alert("Settings is saved !");
		}
	}, [processStatus]);

	const moveToRight = (id: number) => {
		const item = availableItems.find((item) => item._id === id);
		if (item) {
			setSelectedItems([...selectedItems, item]);
			setAvailableItems(availableItems.filter((item) => item._id !== id));
		}
	};

	const moveToLeft = (id: number) => {
		const item = selectedItems.find((item) => item._id === id);
		if (item) {
			setAvailableItems([...availableItems, item]);
			setSelectedItems(selectedItems.filter((item) => item._id !== id));
		}
	};

	const moveCategory = (fromIndex: number, toIndex: number) => {
		const updatedCategories = [...selectedItems];
		const [movedCategory] = updatedCategories.splice(fromIndex, 1);
		updatedCategories.splice(toIndex, 0, movedCategory);
		setSelectedItems(updatedCategories);
	};

	const saveSelectedItems = async () => {
		await saveFollowedCategories(user!._id, selectedItems);
	}

	return (
		<>
			<div className="flex py-3 space-x-5">

				<div className="w-1/2 p-4 bg-gray-1 rounded-lg bg-opacity-20">
					<h2 className="font-semibold mb-3">Available Items</h2>

					<div className="grid grid-cols-1 gap-3">
						{availableItems.map((item) => (
							<div key={item._id} className="flex bg-white border-gray-300 cursor-pointer items-center p-2 border rounded-md space-x-2" onClick={() => moveToRight(item._id)}>
								{/* {item.name} */}


								<div className="category-icon px-3">
									<div dangerouslySetInnerHTML={{ __html: item.icon }} />
								</div>
								<div className="overflow-hidden">{item.name}</div>

							</div>
						))}
					</div>
				</div>

				<div className="w-1/2 p-4 bg-blue-2 rounded-lg bg-opacity-40">
					<h2 className="font-semibold mb-3">Selected Items</h2>

					<DndProvider backend={HTML5Backend}>
						<div className="grid grid-cols-1 gap-3">
							{selectedItems!.map((category, index) => (
								<DraggableCategoryItem
									key={category.id}
									category={category}
									index={index}
									moveCategory={moveCategory}
									itemClick={(item) => moveToLeft(item._id)}
								/>
							))}
						</div>
					</DndProvider>
				</div>

			</div>

			<button
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
				onClick={() => saveSelectedItems()}
			>
				Save Categories

				{processStatus == Constant.RESPONSE_SAVE_USER_CATEGORIES_REQUEST && <FaSpinner className="ml-auto h-5" size={20} />}
			</button>
		</>
	);
};

export default CategorySelectForm;
