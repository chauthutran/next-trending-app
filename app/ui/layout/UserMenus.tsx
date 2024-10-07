'use client';


import { useAppPage } from "@/contexts/AppPageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import * as Constant from "@/libs/constants";

export default function UserMenus() {

    const { logout } = useAuth();
    const { setAppPage } = useAppPage();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Function to handle outside click
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false); // Close menu if click is outside
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    // Toggle menu visibility
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        const ok = confirm("Are you sure you want to log-out ?");
        if( ok ) {
            logout();
        }
    }
    // Function to handle outside click
    return (
        <div className="relative inline-block">
            {/* User Icon */}
            <FaRegUser size={18} onClick={toggleMenu} className="cursor-pointer" />

            {/* Context Menu */}
            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
                >
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Profile
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setAppPage(Constant.PAGE_USER_CATETORY_SELECTORS)}>
                            Settings
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleLogout()}>
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}