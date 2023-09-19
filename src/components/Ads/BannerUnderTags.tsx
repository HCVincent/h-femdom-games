import Script from "next/script";
import React, { useEffect } from "react";

type BannerUnderTagsProps = {};

const BannerUnderTags: React.FC<BannerUnderTagsProps> = () => {
  return (
    <div className="hidden lg:flex w-full h-[250px] justify-center items-center mt-20 ">
      <div id="adsBanner-exoclick-undertags" className="w-[900px] h-[250px] ">
        <Script
          type="application/javascript"
          async
          src="https://a.magsrv.com/ad-provider.js"
        ></Script>
        <ins
          className="eas6a97888e"
          data-zoneid="5078370"
          data-keywords="cartoon,games,foot,foot fetish,femdom,female dominance"
        ></ins>
        <Script
          id="window.adsbyjuicy-banner-undertags"
          className="w-[900px] h-[250px]"
        >{`(AdProvider = window.AdProvider || []).push({"serve": {}});`}</Script>
      </div>
    </div>
  );
};
export default BannerUnderTags;
