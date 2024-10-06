'use client';

import { useEffect, useState } from "react";
import * as dbService from "@/libs/mongodb";
import { JSONObject } from "@/libs/definations";


export default function CategorySelectForm() {

  const [categories, setCategories] = useState<JSONObject[] | null>(null);
  const [selectedItems, setSelectedItems] = useState<JSONObject[]>([]);
  const [loading, setLoading] = useState(false);



  const fetchCategories = async () => {
    setLoading(true);
    const response = await dbService.fetchCategories();
    setCategories(response.data);

    setLoading(false);
  };

  const handleCategoryClick = (category: JSONObject) => {
    const isSelected = selectedItems.includes(category);
    let updatedSelectedCategories;

    if (isSelected) {
      updatedSelectedCategories = selectedItems.filter(cat => cat.id !== category.id);
    } else {
      updatedSelectedCategories = [...selectedItems, category];
    }

    setSelectedItems(updatedSelectedCategories);
    // onSelectionChange(updatedSelectedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelectCategory = (category: JSONObject) => {
    
  }

  if ( categories === null ) return (<div>Loading ... </div>);

  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className={`p-3 rounded border ${selectedItems.includes(category) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}