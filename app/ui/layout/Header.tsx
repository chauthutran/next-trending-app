'use client';

import { useAppPage } from "@/contexts/AppPageContext";
import { useState } from "react";
import { GiOakLeaf } from "react-icons/gi";
import * as Constant from "@/libs/constants";
import { LuGanttChart } from "react-icons/lu";


export default function Header() {

    const { appPage, setAppPage } = useAppPage();

    return (
        <header className="relative px-5 py-2 grid grid-cols-2 text-sm text-navy-blue bg-white">

            <div className="text-blue-500 absolute text-right opacity-35 right-0">
                <GiOakLeaf size={70} />
            </div>
            {/* Center the text */}
            <div className="flex items-center font-extrabold">
                <div className="uppercase text-xl text-black border-b-2 pl-8 border-coral-sunset">World Trending</div>
            </div>


            {/* Left side with icon */}
            <div className="flex space-x-8 justify-center items-center">
                <button className={`uppercase border-b px-3 hover:border-coral-sunset ${appPage === Constant.PAGE_HOME ? "bg-crimson-red text-white rounded-sm" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_HOME)}>Home</button>
                <button className={`uppercase border-b px-3 hover:border-coral-sunset ${appPage === Constant.PAGE_ABOUT ? "bg-crimson-red text-white rounded-sm" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_ABOUT)}>About</button>
                {/* </div> */}
                {/* Right side with buttons */}
                {/* <div className="flex space-x-8 justify-center items-center"> */}
                <button className={`uppercase border-b px-3 hover:border-coral-sunset ${appPage === Constant.PAGE_LOGIN ? "bg-crimson-red text-white rounded-sm" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_LOGIN)}>Login</button>
                <button className={`uppercase border-b px-3 hover:border-coral-sunset ${appPage === Constant.PAGE_USER_REGISTRATION ? "bg-crimson-red text-white rounded-sm" : "border-white"}`} onClick={() => setAppPage(Constant.PAGE_USER_REGISTRATION)}>Register</button>
            </div>

        </header>
    )
}