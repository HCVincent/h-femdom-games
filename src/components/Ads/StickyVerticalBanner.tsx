import Script from "next/script";
import React, { useEffect } from "react";

type StickyVerticalBannerProps = {};

const StickyVerticalBanner: React.FC<StickyVerticalBannerProps> = () => {
  return (
    <div id="adsBanner-exoclick-undertags" className="w-[160px] h-[600px] ">
      <Script
        type="application/javascript"
        async
        src="https://a.magsrv.com/ad-provider.js"
      ></Script>
      <ins
        className="eas6a97888e"
        data-zoneid="5080650"
        data-keywords="cartoon,games,foot,foot fetish,femdom,female dominance"
      ></ins>
      <Script
        id="window.adsbyjuicy-banner-undertags"
        className="w-[160px] h-[600px]"
      >{`(AdProvider = window.AdProvider || []).push({"serve": {}});`}</Script>
    </div>
  );
};
export default StickyVerticalBanner;
