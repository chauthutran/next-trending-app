'use client';

import { JSONObject } from "@/libs/definations";
import TrendByCategory from "./details/TrendDetailsPage";
import CategoryList from "./category/CategoryList";
import { useState } from "react";
import SlideBar from "./layout/SlideBar";
import Navigation from "./layout/Navigation";
import { useAppPage } from "@/contexts/AppPageContext";
import RegisterForm from "./user/RegisterForm";


export default function AppWrapper() {

    const { appPage } = useAppPage();

    const [toppic, setTopic] = useState<JSONObject | null>(null);

    return (
        <>
            <div className="mx-5">
                <Navigation handleOnItemClick={(category: JSONObject) => setTopic(category)} />
            </div>

            <main className={`flex-1 overflow-auto flex`}>
                {appPage && <RegisterForm /> }


            {/* Fixed Navigation Component */}
            {/* <div className="fixed top-0 left-0"> Fixed positioning */}
               
            {/* </div> */}

            {/* Main Content with Padding */}
            <div className=""> {/* Adjust padding-top based on the height of your Navigation */}
                {/* <SlideBar /> */}
                {/* <CategoryList handleOnItemClick={(category: JSONObject) => setTopic(category)}/> */}
                {toppic !== null && <TrendByCategory category={toppic} />}
            </div>
        </main>
        </>
    )
}