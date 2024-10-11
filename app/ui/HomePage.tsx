'use client';

import { JSONObject } from "@/libs/definations";
import { useEffect, useState } from "react";
import UserCategoryList from "./user/UserCategoryList";
import UserPostList from "./post/UserPostList";
import { useAuth } from "@/contexts/AuthContext";
import * as dbService from "@/libs/mongodb";
import CategoryBar from "./layout/CategoryBar";
import CategoryList from "./category/CategoryList";
import CategorySmallBar from "./layout/CategorySmallBar";


export default function HomePage() {

    const { user } = useAuth();
    const [toppic, setTopic] = useState<JSONObject | null>(null);

	const [categories, setCategories] = useState<JSONObject[] | null>(null);
	const [loading, setLoading] = useState(false);
	
	const fetchCategories = async () => {
		setLoading(true);
		const response = await dbService.fetchCategories();
		setCategories(response.data);

		setLoading(false);
	};

	useEffect(() => {
		if( user === null ) {
            fetchCategories();
        }
        else {
            setCategories(user.followedCategories);
        }
	}, []);


    if( categories === null ) return( <div>Loading ...</div>);

    return (
        <div className="">
            {/* {user != null && <UserCategoryList  />} */}
            {/* <CategoryBar categories={categories} handleOnItemClick={(category: JSONObject) => setTopic(category)} /> */}
            <CategorySmallBar categories={categories} handleOnItemClick={(category: JSONObject) => setTopic(category)} />
            
            <div className="m-5">
                <UserPostList />
            </div>
        </div>
    )
}