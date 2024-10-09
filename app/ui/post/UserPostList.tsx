import React, { useEffect, useState } from 'react';
import { JSONObject } from '@/libs/definations';
import * as dbService from "@/libs/mongodb";
import UserPostItem from './UserPostItem';


const UserPostList: React.FC = () => {
    const [posts, setPosts] = useState<JSONObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [pageNo, setPageNo] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async (pageNo: number) => {
        setLoading(true);
        const response = await dbService.fetchPosts(pageNo);
        if (response.status === "success") {
            setPosts((prevPosts) => [...prevPosts, ...response.data]);
            if (response.data.length === 0) {
                setHasMore(false);
            }
            else {
                setHasMore(true);
            }
        }
        else {
            setError(response.message);
        }

        setLoading(false);
    };
    
    const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100 &&
          !loading
         && hasMore
        ) {
            console.log("=== handleScroll ");
          setPageNo((prev) => prev + 1); // Load more posts
        }
    };

    useEffect(() => {
        console.log("=== useEffect pageNo: " + pageNo);
        fetchPosts(pageNo);
    }, [pageNo]);

    useEffect(() => {
        console.log("=== useEffect loading: " + loading);
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    // }, [loading]);
    }, [loading, hasMore]);


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <div className="grid grid-cols-1 gap-4"> */}
                {posts.map((post) => (
                    <UserPostItem key={`list_${post._id}`} data={post} />
                ))}
            </div>

            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more posts to load.</p>}
        </>
    );
};

export default UserPostList;
