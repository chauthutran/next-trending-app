'use client';

import { JSONObject } from "@/libs/definations";
import { useEffect, useState } from "react";

export default function SlideBar() {

    const [categories, setCategories] = useState<JSONObject[] | null>(null);
	const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        const res = await fetch('/api/category');

        const data = await res.json();
  console.log(data);
      // --- dailyTrends
      setCategories(data.data); // Adjust based on your needs

        setLoading(false);
      };


    useEffect(() => {
        fetchCategories();
    }, []);

    if( categories === null ) return (<div>Loading ...</div>);
    return(
        <div className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0">
        <h2 className="text-xl font-bold px-5 py-3 border-b border-gray-700">Categories</h2>
        <div className="overflow-y-auto h-full">
            <ul className="space-y-2 px-5 py-3">
                {categories!.map((category, index) => (
                    <li key={index} className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}