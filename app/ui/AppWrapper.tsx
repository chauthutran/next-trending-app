'use client';

import { JSONObject } from "@/libs/definations";
import TrendByCategory from "./details/TrendDetailsPage";
import { useState } from "react";
import { useAppPage } from "@/contexts/AppPageContext";
import * as Constant from "@/libs/constants";
import CategorySelectForm from "./user/settings/CategorySelectForm";
import RegisterForm from "./user/RegisterForm";
import LoginForm from "./user/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import PostForm from "./post/PostForm";
import HomePage from "./HomePage";


export default function AppWrapper() {

    const { user } = useAuth();
    const { appPage } = useAppPage();

    return (
        <>
            <main className={`flex-1 overflow-auto`}>
                
                {appPage === Constant.PAGE_HOME && user !== null && 
                    <HomePage />
               }

                {/* Login Form */}
                {appPage === Constant.PAGE_LOGIN && <div className="mx-auto m-5">
                    <LoginForm /> 
                </div>}
                
                {/* Register Form */}
                {appPage === Constant.PAGE_USER_REGISTRATION && <div className="mx-5 my-5">
                    <RegisterForm />
                </div>}

                {/* User Settings */}
                {appPage === Constant.PAGE_USER_CATETORY_SELECTORS && <div className="mx-auto px-3 py-5">
                    <CategorySelectForm /> 
                </div>}

                {appPage === Constant.PAGE_POST_ITEM && <div className="flex-1 items-center justify-center m-5">
                    <PostForm />
                </div>}
        </main>
        </>
    )
}