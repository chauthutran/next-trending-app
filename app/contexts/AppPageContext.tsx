"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Contanst from "@/libs/constants";

interface MainUiContextProps {
	appPage: string;
	setAppPage: (pageName: string) => void;
}

const MainUiContext = createContext<MainUiContextProps>({
	appPage: Contanst.PAGE_HOME,
	setAppPage: (pageName: String) => {}
});

export const useAppPage = (): MainUiContextProps => {
	const context = useContext(MainUiContext);
	
	if (!context) {
	  throw new Error('useAppPage must be used within an PageProvider');
	}
	return context;
};

export const AppPageProvider = ({ children }: { children: ReactNode }) => {
	const [appPage, setAppPage] = useState<string>(Contanst.PAGE_HOME);

	return (
		<MainUiContext.Provider value={{ appPage, setAppPage }}>
			{children}
		</MainUiContext.Provider>
	);
};
