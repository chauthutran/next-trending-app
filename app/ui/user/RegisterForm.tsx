/** The login page for user authentication. Contains the LoginForm component. */

"use client";

import { useAppPage } from '@/contexts/AppPageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from "react-icons/io5";
import * as Constant from "@/libs/constants";


export default function RegisterForm() {

	const { setAppPage } = useAppPage();
	const { loading, error, user, register } = useAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState<string | null>(null);


	useEffect(() => {
		if (user != null) {
			setAppPage(Constant.PAGE_HOME);
		}
	}, [user])

	const handleOnRegister = () => {
		if (checkValidUser()) {
			register({ email, password });
		}
	};


	const validateConfirmPassword = (password: string, confirmPassword: string) => {
		if (password !== confirmPassword) {
			setErrorMsg('Passwords do not match!');
		} else {
			setErrorMsg(null);
		}
	};


	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		validateConfirmPassword(newPassword, confirmPassword);
	};

	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newConfirmPassword = e.target.value;
		setConfirmPassword(newConfirmPassword);
		validateConfirmPassword(password, newConfirmPassword);
	};

	const checkValidUser = () => {
		return (email !== "" && password !== "" && confirmPassword === password);
	}

	const handleCancelBtn = () => {
		const ok = confirm("Are you sure you don't want to register an account ?")
		if (ok) {
			setAppPage(Constant.PAGE_HOME);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
				<h1 className="text-2xl mb-4">Register</h1>
				<form onSubmit={handleOnRegister} action="POST">
					{error && <p className="text-red-500">{error}</p>}
					<div className="mb-4">
						<label htmlFor="name" className="block text-sm">Name</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="border border-gray-300 rounded px-3 py-2 w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="border border-gray-300 rounded px-3 py-2 w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="block text-sm">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="border border-gray-300 rounded px-3 py-2 w-full"
							required
						/>
					</div>

					<div className="mb-4">
				<label
					className="block text-xs font-medium text-gray-900"
					htmlFor="confirmPassword"
				>
					Confirm Password
				</label>
				<div className="relative">
						<input
							className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
							id="confirmPassword"
							type="password"
							name="confirmPassword"
							value={confirmPassword}
							required
							minLength={4}
							placeholder="Confirm Password"
							onChange={handleConfirmPasswordChange}
						/>
						<IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

						{errorMsg !== null && <span className="text-red-500 italic text-sm">{errorMsg}</span>}
					</div>
				</div>

					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
