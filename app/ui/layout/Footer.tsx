"use client"


export default function Footer() {



    return (
        <footer className="shadow-md p-1 pt-2 text-sm bg-black text-white">
            <div className="flex flex-col justify-between items-center space-y-1">
                <p className="flex-1 justify-center">© 2024 World Trending. All rights reserved.</p>
                <div className="flex space-x-3">
                    <div className="hover:text-color-7 cursor-pointer">Register</div>
                    
                    <div> | </div>
                    <div className="hover:text-color-7 cursor-pointer">About Us</div>
                </div>
            </div>
        </footer>
    )
}