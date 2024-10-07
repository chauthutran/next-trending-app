'use client';

import { useAppPage } from "@/contexts/AppPageContext";
import { useState } from "react";
import { GiOakLeaf } from "react-icons/gi";
import * as Constant from "@/libs/constants";
import { LuGanttChart } from "react-icons/lu";
import { MdHome } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";
import UserMenus from "./UserMenus";


export default function Header() {

    const { appPage, setAppPage } = useAppPage();
    const { user } = useAuth();

    return (
        <header className="relative px-5 py-2 grid grid-cols-2 bg-white">

            <div className="absolute text-right opacity-45 right-0 text-blue-1">
                <GiOakLeaf size={70} />
            </div>
            
            <div className="flex items-center text-3xl font-extrabold space-x-3">
                <div className="">World</div>
                <div className="">Trending</div>
            </div>


            <div className="flex space-x-5 justify-end items-center text-blue-1 mr-12 text-sm ">
                <button className={`border-b-2 hover:border-gray-500 px-2 ${appPage === Constant.PAGE_HOME ? "bg-blue-1 text-white" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_HOME)}>
                   Home
                </button>

                {user !== null && <button className={`border-b-2 hover:border-gray-500 px-2 ${appPage === Constant.PAGE_POST_ITEM ? "bg-blue-1 text-white" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_POST_ITEM)}>
                   Post
                </button>}

                {/* <button className={`border-b-2 hover:border-gray-500 px-2 ${appPage === Constant.PAGE_ABOUT ? "bg-blue-1 text-white" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_ABOUT)}>About</button> */}
               
                {user === null && <button className={`border-b-2 hover:border-gray-500 px-2 ${appPage === Constant.PAGE_LOGIN ? "bg-blue-1 text-white" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_LOGIN)}>Login</button>}
                {user === null && <button className={`border-b-2 hover:border-gray-500 px-2 ${appPage === Constant.PAGE_USER_REGISTRATION ? "bg-blue-1 text-white" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_USER_REGISTRATION)}>Register</button>}

                {user !== null && <UserMenus />}
            </div>

        </header>
    )
}