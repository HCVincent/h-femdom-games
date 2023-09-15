import React, { createContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Script from "next/script";
declare global {
  interface Window {
    adsbyjuicy: {
      push(args: any): void;
    };
  }
}
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
        <Script
          type="text/javascript"
          data-cfasync="false"
          async
          src="https://poweredby.jads.co/js/jads.js"
        ></Script>
        <ins id="1033717" data-width="908" data-height="270"></ins>
        <Script
          id="window.adsbyjuicy-banner"
          type="text/javascript"
          data-cfasync="false"
          async
        >{`(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1033717});`}</Script>
      </div>

      <div
        id="adsContainer-mobile"
        className="flex lg:hidden justify-center items-center mt-4"
      >
        <Script
          type="text/javascript"
          data-cfasync="false"
          async
          src="https://poweredby.jads.co/js/jads.js"
        ></Script>
        <ins id="1034248" data-width="300" data-height="112"></ins>
        <Script
          id="window.adsbyjuicy-image"
          type="text/javascript"
          data-cfasync="false"
          async
        >{`(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1034248});`}</Script>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
