'use client';


import AppWrapper from "./ui/AppWrapper";
import Footer from "./ui/layout/Footer";
import Header from "./ui/layout/Header";

export default function Home() {

  return (
    <div className="h-screen flex flex-col text-black">
      <Header />
      <AppWrapper />
      <Footer />
    </div>
  );
}
