'use client';

import { JSONObject } from "@/libs/definations";
import TrendByCategory from "./details/TrendDetailsPage";
import CategoryList from "./category/CategoryList";
import { useState } from "react";
import SlideBar from "./layout/SlideBar";


export default function AppWrapper() {

    const [toppic, setTopic] = useState<JSONObject | null>(null);
  
    return (
         <main className={`flex-1 overflow-auto`}>
             {/* <SlideBar /> */}
            <CategoryList handleOnItemClick={(category: JSONObject) => setTopic(category)}/>
             {toppic !== null && <TrendByCategory category={toppic}/>}
         </main>
    )
}