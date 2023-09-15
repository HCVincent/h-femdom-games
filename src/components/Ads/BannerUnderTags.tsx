import React, { useEffect } from "react";

type BannerUnderTagsProps = {};

const BannerUnderTags: React.FC<BannerUnderTagsProps> = () => {
  useEffect(() => {
    // Add the ads script dynamically to the adsContainer-exoclick div
    const adsContainer = document.getElementById(
      "adsBanner-exoclick-undertags"
    );
    if (adsContainer) {
      const script = document.createElement("script");
      script.src = "https://a.magsrv.com/ad-provider.js";
      script.type = "application/javascript";
      script.async = true;

      const ins = document.createElement("ins");
      ins.className = "eas6a97888e";
      ins.setAttribute("data-zoneid", "5078370");
      ins.setAttribute(
        "data-keywords",
        "cartoon,games,foot,foot fetish,femdom,female dominance"
      );

      const pushScript = document.createElement("script");
      pushScript.textContent = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;

      adsContainer.appendChild(script);
      adsContainer.appendChild(ins);
      adsContainer.appendChild(pushScript);
    }
  }, []);

  return (
    <div className="hidden lg:flex w-full justify-center items-center mt-10">
      <div
        id="adsBanner-exoclick-undertags"
        className="w-[900px] h-[250px]"
      ></div>
    </div>
  );
};
export default BannerUnderTags;
