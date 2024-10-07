'use client';

import { useAppPage } from "@/contexts/AppPageContext";
import { useState } from "react";
import { GiOakLeaf } from "react-icons/gi";
import * as Constant from "@/libs/constants";
import { LuGanttChart } from "react-icons/lu";


export default function Header() {

    const { appPage, setAppPage } = useAppPage();

    return (
        <header className="relative px-5 py-2 grid grid-cols-2 text-sm">

            <div className="absolute text-right opacity-45 right-0">
                <GiOakLeaf size={70} />
            </div>
            {/* Center the text */}
            <div className="flex items-center text-3xl font-extrabold space-x-3">
                <div className="">World</div>
                <div className="">Trending</div>
            </div>


            {/* Left side with icon */}
            <div className="flex space-x-8 justify-center items-center text-blue-1">
                <button className={`border-b-2 hover:border-gray-500 ${appPage === Constant.PAGE_HOME ? "border-gray-400" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_HOME)}>Home</button>
                <button className={`border-b-2 hover:border-gray-500 ${appPage === Constant.PAGE_ABOUT ? "border-gray-400" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_ABOUT)}>About</button>
               
                <button className={`border-b-2 hover:border-gray-500 ${appPage === Constant.PAGE_LOGIN ? "border-gray-400" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_LOGIN)}>Login</button>
                <button className={`border-b-2 hover:border-gray-500 ${appPage === Constant.PAGE_USER_REGISTRATION ? "border-gray-400" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_USER_REGISTRATION)}>Register</button>
            </div>

        </header>
    )
}