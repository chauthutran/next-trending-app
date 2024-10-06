'use client';


import { AppPageProvider } from "./contexts/AppPageContext";
import { AuthProvider } from "./contexts/AuthContext";
import AppWrapper from "./ui/AppWrapper";
import Footer from "./ui/layout/Footer";
import Header from "./ui/layout/Header";
import Navigation from "./ui/layout/Navigation";

export default function Home() {

	return (
		<AppPageProvider>
			<AuthProvider>
				<div className="h-screen flex flex-col text-black">
					<Header />
					<AppWrapper />
					<Footer />
				</div>
			</AuthProvider>
		</AppPageProvider>
	);
}
