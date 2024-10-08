'use client';

import { useState } from 'react';
import * as dbService from '@/libs/mongodb';
import { useAuth } from '@/contexts/AuthContext';


export default function PostForm() {
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState('');
    const [imageFile, setImageFile] = useState<string | null>(null);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const categoryList = categories.split(',').map(cat => cat.trim());
        dbService.createPost({ title, content, categories: categoryList, imageFile, authorId: user!._id });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Categories (comma separated)</label>
                    <input
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <button type="submit">Post</button>
            </form>

        </div>
    );
}
