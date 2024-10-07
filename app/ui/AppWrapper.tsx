'use client';

import { JSONObject } from "@/libs/definations";
import TrendByCategory from "./details/TrendDetailsPage";
import { useState } from "react";
import UserCategoryList from "./user/UserCategoryList";
import { useAppPage } from "@/contexts/AppPageContext";
import * as Constant from "@/libs/constants";
import CategorySelectForm from "./user/settings/CategorySelectForm";
import RegisterForm from "./user/RegisterForm";
import LoginForm from "./user/LoginForm";
import { useAuth } from "@/contexts/AuthContext";


export default function AppWrapper() {

    const { user } = useAuth();
    const { appPage } = useAppPage();
    const [toppic, setTopic] = useState<JSONObject | null>(null);

console.log(appPage);
    return (
        <>
           
            <main className={`flex-1 overflow-auto flex`}>
                
                {(user !== null && appPage !== Constant.PAGE_LOGIN &&
                    appPage !== Constant.PAGE_USER_REGISTRATION &&
                    appPage !== Constant.PAGE_USER_CATETORY_SELECTORS) && <div className="mx-5">
                    <UserCategoryList handleOnItemClick={(category: JSONObject) => setTopic(category)} />
                </div>}


                {appPage === Constant.PAGE_LOGIN && <div className="mx-auto m-5">
                    <LoginForm /> 
                </div>}
                

                {appPage === Constant.PAGE_USER_REGISTRATION && <div className="mx-5 my-5">
                    <RegisterForm />
                </div>}
                {appPage === Constant.PAGE_USER_CATETORY_SELECTORS && <div className="mx-auto p-5 ">
                    <CategorySelectForm /> 
                </div>}
                

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