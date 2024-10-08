'use client';

import { useEffect, useState } from 'react';
import * as dbService from '@/libs/mongodb';
import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/libs/definations';
import { FaSpinner } from 'react-icons/fa';


export default function PostForm() {
    const { user } = useAuth();
    const [availableCategories, setAvailableCategories] = useState<JSONObject[] | null>(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [imageFile, setImageFile] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean | null>(null);

    const fetchCategories = async () => {
        const response = await dbService.fetchCategories();
        setAvailableCategories(response.data);
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await dbService.createPost({ title, content, categories, imageFile, authorId: user!._id });
        if (response.status === "success") {
            console.log("The message is posted!");
            setLoading(null);
            setTitle("");
            setContent("");
            setCategories([]);
            setImageFile(null);
        }
        else {
            alert(response.message);
        }
    };

    const handleCategoryOnClick = (e: React.MouseEvent<HTMLInputElement>, category: JSONObject) => {
        const selectedCategoryId = category._id;
        if (!e.target.checked) { // Remove
            const result = categories.filter(item => item !== selectedCategoryId);
            setCategories(result);
        }
        else { // Add
            categories.push(selectedCategoryId);
            setCategories(categories);
        }
    }

    if (availableCategories === null) return (<div>Loading ...</div>);

    return (
        <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-5 flex items-center justify-center text-center">Post Message</h2>

            <form onSubmit={handleSubmit} action="POST">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold mb-1">Upload Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold">Categories</label>
                    <div className="grid grid-cols-5 gap-4 bg-creamy-white p-3 border border-gray-300 rounded-md">
                        {availableCategories.map((category: JSONObject, index: number) => (
                            <label
                                key={index}
                                className="flex flex-col items-center justify-center bg-white shadow-lg rounded-md border-light-pink p-3 space-y-2"
                            >
                                <div className="flex flex-row items-center justify-center space-y-2">
                                    <input
                                        className="w-4 h-4"
                                        type="checkbox"
                                        onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCategoryOnClick(e, category)}
                                    />
                                    <div className="text-lg w-fit px-3 py-2 transition-colors duration-300">
                                        <div className="category-icon-small">
                                            <div dangerouslySetInnerHTML={{ __html: category.icon }} />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold">{category.name}</span>
                            </label>
                        ))}
                    </div>

                </div>


                <button
                    type="submit"
                    className="flex bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                    <span className="flex-1">Post</span>
                    {loading && <FaSpinner className="ml-auto h-5" size={20} />}

                </button>
            </form>

        </div>
    );
}
