import React, { useEffect, useState } from 'react';
import { JSONObject } from '@/libs/definations';
import * as dbService from "@/libs/mongodb";


const UserPostList: React.FC = () => {
    const [posts, setPosts] = useState<JSONObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await dbService.fetchPosts();
            if (response.status === "success") {
                setPosts(response.data);
            }
            else {
                setError(response.message);
            }

            setLoading(false);
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
                <div key={post._id} className="bg-white shadow-md rounded-md p-4">
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p className="text-gray-700 mb-2">{post.content}</p>
                    {post.image && (
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-md mb-2" />
                    )}
                    <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            ))}
        </div>
    );
};

export default UserPostList;
