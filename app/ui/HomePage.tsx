'use client';

import { JSONObject } from "@/libs/definations";
import { useState } from "react";
import UserCategoryList from "./user/UserCategoryList";
import UserPostList from "./post/UserPostList";


export default function HomePage() {

    const [toppic, setTopic] = useState<JSONObject | null>(null);

    return (
    <div className="m-3">
        <UserCategoryList handleOnItemClick={(category: JSONObject) => setTopic(category)} />

        {/* <div className="mt-5">
            <UserPostList />
        </div> */}
    </div>
    )
}