"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as dbService from "@/libs/mongodb";
import { JSONObject } from '@/libs/definations';
import * as Constant from "@/libs/constants";

interface AuthContextProps {
	user: JSONObject | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (user: JSONObject) => Promise<void>;
	setUser: (user: JSONObject | null) => void,
	error: string | null;
	processStatus: string;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	login: async () => { },
	logout: () => { },
	register: async(user: JSONObject) => {},
	setUser: (user: JSONObject | null) => {},
	error: null,
	processStatus: ""
});

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);

	if (!context) {
	  throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any>(null);
	const [processStatus, setProcessStatus] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const login = async (email: string, password: string) => {
		setProcessStatus(Constant.RESPONSE_LOGIN_REQUEST);
		setError(null);

		const response: JSONObject = await dbService.login({email, password});

		if (response.status != "success")  {
			setProcessStatus(Constant.RESPONSE_LOGIN_FAILURE);
			setError(response.message);
		}
		else {
			setUser(response.data);
			setProcessStatus(Constant.RESPONSE_LOGIN_SUCCESS);
		}
	};

	const logout = () => {
		setUser(null);
	}

	const register = async(userData: JSONObject) => {
		setProcessStatus(Constant.RESPONSE_REGISTER_USER_REQUEST);
		setError(null);
		
		const response: JSONObject = await dbService.register(userData);

		if (response.status != "success")  {
			setError(response.message);
			setProcessStatus(Constant.RESPONSE_REGISTER_USER_FAILURE);
		}
		else {
			setUser(response.data);
			setProcessStatus(Constant.RESPONSE_REGISTER_USER_SUCCESS);
		}
	}

	return (
		<AuthContext.Provider value={{ user, setUser, processStatus, error: error, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};
