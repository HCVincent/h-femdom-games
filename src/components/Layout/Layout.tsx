import React, { createContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
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
  useEffect(() => {
    // Get the ads container element
    const adsContainer = document.getElementById("adsContainer");

    if (adsContainer) {
      // Ads code here
      const script = document.createElement("script");
      script.src = "https://poweredby.jads.co/js/jads.js";
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      adsContainer.appendChild(script);

      const ins = document.createElement("ins");
      ins.id = "1033717";
      ins.setAttribute("data-width", "908");
      ins.setAttribute("data-height", "270");
      adsContainer.appendChild(ins);

      (window.adsbyjuicy = window.adsbyjuicy || []).push({ adzone: 1033717 });
    }

    return () => {
      // Cleanup if necessary
    };
  }, []);
  return (
    <div className="flex flex-col w-full min-h-screen justify-between">
      <div className="w-full top-0 sticky z-50 ">
        <Navbar />
      </div>
      <main className="flex justify-center w-full">{children}</main>
      <div
        id="adsContainer"
        className="flex justify-center items-center mt-4"
      ></div>
      <Footer />
    </div>
  );
};
export default Layout;
