"use client";

import { useAppPage } from '@/contexts/AppPageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import * as Constant from "@/libs/constants";


export default function RegisterForm() {

	const { setAppPage } = useAppPage();
	const { processStatus, error, user, register } = useAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState<string | null>(null);


	const handleOnRegister = async(e: React.FormEvent) => {
		e.preventDefault();

		if (checkValidUser()) {
			await register({ name, email, password });
			if (processStatus != Constant.RESPONSE_REGISTER_USER_SUCCESS) {
				alert("The user is registered successfully and logged!");
				setAppPage(Constant.PAGE_USER_CATETORY_SELECTORS);
			}
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
	
	return (
		<section className="">
			<p className="text-lg text-justify">Creating an account with us is quick and easy. By registering, you’ll unlock access to exclusive features, personalized recommendations, and a faster checkout experience. Join our community today and start exploring everything we have to offer!</p>

			<div className="flex justify-center space-x-3">
				<div className="w-3 h-3 bg-[#ff7f7f] rounded-full"></div>
				<div className="w-3 h-3 bg-[#007687] rounded-full"></div>
				<div className="w-3 h-3 bg-[#007687] rounded-full"></div>
			</div>


			<h2 className="text-3xl font-bold mb-5 flex items-center justify-center text-center mt-8">Register a new user</h2>

			<div className="flex items-center justify-center">
				<div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
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
								onChange={(e) => handlePasswordChange(e)}
								className="border border-gray-300 rounded px-3 py-2 w-full"
								minLength={4}
								required
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="confirmPassword" className="block text-sm">
								Confirm Password
							</label>
								<input
									id="confirmPassword"
									type="password"
									value={confirmPassword}
									onChange={handleConfirmPasswordChange}
									className="border border-gray-300 rounded px-3 py-2 w-full"
									required
								/>
								{errorMsg !== null && <span className="text-red-500 italic text-sm">{errorMsg}</span>}
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


		</section>
	);
}
