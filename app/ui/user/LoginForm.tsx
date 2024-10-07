/** The login page for user authentication. Contains the LoginForm component. */

"use client";

import { CiLock, CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { FaFacebook, FaLinkedinIn, FaPinterest, FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from "react-icons/io5";
import * as Constant from '@/libs/constants';
import { useAuth } from "@/contexts/AuthContext";
import { useAppPage } from "@/contexts/AppPageContext";
import { MdOutlineMail } from "react-icons/md";
import { PiMoonStarsFill } from "react-icons/pi";
import { BiLogoGmail } from "react-icons/bi";

export default function LoginForm() {

	const { setAppPage } = useAppPage();
	const { user, login, processStatus, error } = useAuth();

	const [email, setEmail] = useState("test1@gmail.com");
	const [password, setPassword] = useState("1234");


	useEffect(() => {
		if (user != null) {
			setAppPage( Constant.PAGE_HOME );
		}
	}, [user])

	const handleLoginBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		login(email, password);
	};


	return (
		<div className="shadow-md p-5 rounded-xl bg-white">

			<h2 className="text-2xl font-bold mb-3 text-center">Welcome</h2>
			<h3 className="text-center">
				<div>By signing in, you are agreeing </div>
				<div>our <span className="text-blue-1">Team and privacy policy</span></div>
				</h3>
			
			<div className="flex h-8 items-end space-x-1 text-red-500">
				{error != null && <p>{error}</p>}
			</div>

			<div className="mb-4">
				<div className="relative">
					<input
						className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
						id="email"
						type="email"
						name="email"
						value={email}
						placeholder="Email address"
						required
						onChange={(e) => { setEmail(e.target.value) }}
					/>
					<MdOutlineMail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
				</div>
			</div>

			<div className="mb-4">
				<div className="relative">
					<input
						className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
						id="password"
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						required
						minLength={4}
						onChange={(e) => { setPassword(e.target.value) }}
					/>
					<CiLock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
				</div>
			</div>

			<div className="mb-8 flex space-x-10 justify-center items-center text-sm">
				<div className="text-gray-500">
					<label className="space-x-2 justify-center items-center">
						<input type="checkbox" />
						<span>Remember password</span>
					</label>
				</div>

				<button className="text-blue-1">Forget password</button>
			</div>

			<div className="mb-4">
				<button className="flex w-full flex-row bg-blue-1 text-white px-4 py-2 rounded hover:bg-blue-500" onClick={(e) => handleLoginBtn(e)} >
					<span className="flex-1">Log in</span>
					{processStatus == Constant.RESPONSE_LOGIN_REQUEST && <FaSpinner className="ml-auto h-5" size={20} />}
				</button>
			</div>


			<div className="text-center">or connect with</div>

			<div className="grid grid-cols-4 pb-5 gap-4 mt-4 mx-10">
				<button><FaFacebook size={32} className="text-blue-1"/></button>
				<button><FaPinterest size={32} className="text-red-500" /></button>
				<button><BiLogoGmail size={32} className="text-red-500" /></button>
				<button><FaLinkedinIn  size={30} className="text-blue-1" /></button>
			</div>
		</div>
		
	);
}
