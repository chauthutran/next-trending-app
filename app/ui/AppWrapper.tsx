'use client';

import { JSONObject } from "@/libs/definations";
import TrendByCategory from "./details/TrendDetailsPage";
import { useState } from "react";
import Navigation from "./layout/Navigation";
import { useAppPage } from "@/contexts/AppPageContext";
import * as Constant from "@/libs/constants";
import CategorySelectForm from "./user/register/CategorySelectForm";
import RegisterForm from "./user/register/RegisterForm";
import LoginForm from "./user/LoginForm";


export default function AppWrapper() {

    const { appPage } = useAppPage();

    const [toppic, setTopic] = useState<JSONObject | null>(null);

    return (
        <>
            {(appPage !== Constant.PAGE_USER_REGISTRATION 
                && appPage !== Constant.PAGE_USER_CATETORY_SELECTORS
                && appPage !== Constant.PAGE_LOGIN ) && <div className="mx-5">
                <Navigation handleOnItemClick={(category: JSONObject) => setTopic(category)} />
            </div>}

            <main className={`flex-1 overflow-auto flex`}>
                
                {appPage === Constant.PAGE_LOGIN && <div className="mx-auto ">
                    <LoginForm /> 
                </div>}
                

                {appPage === Constant.PAGE_USER_REGISTRATION && <div className="mx-5 my-5">
                    <RegisterForm />
                </div>}
                {appPage === Constant.PAGE_USER_CATETORY_SELECTORS && <CategorySelectForm /> }
                

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