'use client';

import { useState } from "react";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { FaMountainSun } from "react-icons/fa6";
import { GiBubbles, GiChainLightning, GiCurledLeaf, GiOakLeaf } from "react-icons/gi";
import { LuGanttChart } from "react-icons/lu";
import { MdLightMode } from "react-icons/md";
import { PiMountains, PiMountainsFill, PiStarHalfLight } from "react-icons/pi";
import { RiBarChartHorizontalLine, RiBubbleChartFill } from "react-icons/ri";
import { SiTrendmicro } from "react-icons/si";


export default function Header() {

    const [menu, setMenu] = useState("home");

    return (
        <header className="relative px-5 py-2 grid grid-cols-2 text-sm text-electric-blue bg-white">

            <div className="text-green-leaf absolute text-right opacity-45 right-0">
                <GiOakLeaf size={70} />
            </div>
            {/* Center the text */}
            <div className="flex items-center font-extrabold">
                {/* <div className="py-2"><LuGanttChart size={20} /></div> */}
                <div className="uppercase text-xl text-black border-b-2 pl-8 border-coral-sunset">World Trending</div>
                {/* <div className="py-2"><RiBarChartHorizontalLine size={20} /></div> */}
            </div>


            {/* Left side with icon */}
            <div className="flex space-x-8 justify-center items-center">
                <button className={`uppercase border-b px-3 hover:border-coral-sunset ${menu === "home" ? "bg-coral-sunset text-white rounded-sm" : "border-white"}`}>Home</button>
                <button className={`uppercase border-b px-3 hover:border-coral-sunset ${menu === "about" ? "bg-coral-sunset text-white rounded-sm" : "border-white"}`}>About</button>
                {/* </div> */}
                {/* Right side with buttons */}
                {/* <div className="flex space-x-8 justify-center items-center"> */}
                <button className={`uppercase border-b px-3 hover:border-coral-sunset ${menu === "login" ? "bg-coral-sunset text-white rounded-sm" : "border-white"}`}>Login</button>
                <button className={`uppercase border-b px-3 hover:border-coral-sunset ${menu === "register" ? "bg-coral-sunset text-white rounded-sm" : "border-white"}`}>Register</button>
            </div>

        </header>
    )
}