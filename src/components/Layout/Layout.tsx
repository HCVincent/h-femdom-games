import React, { createContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import dynamic from "next/dynamic";
const JuicyBanner = dynamic(() => import("../Ads/JuicyBanner"), {
  ssr: false,
});
const JuicyMobileImage = dynamic(() => import("../Ads/JuicyMobileImage"), {
  ssr: false,
});

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen justify-between">
      <div className="w-full top-0 sticky z-50 ">
        <Navbar />
      </div>
      <main className="flex justify-center w-full">{children}</main>
      <div
        id="adsContainer"
        className="hidden lg:flex justify-center items-center mt-4"
      >
        <JuicyBanner />
      </div>

      <div
        id="adsContainer-mobile"
        className="flex lg:hidden justify-center items-center mt-4"
      >
        <JuicyMobileImage />
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
