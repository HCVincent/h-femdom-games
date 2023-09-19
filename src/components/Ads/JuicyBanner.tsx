import Script from "next/script";
import React from "react";

type JuicyBannerProps = {};

const JuicyBanner: React.FC<JuicyBannerProps> = () => {
  return (
    <>
      <Script
        type="text/javascript"
        data-cfasync="false"
        async
        src="https://poweredby.jads.co/js/jads.js"
      ></Script>
      <ins
        id="1033717"
        data-width="908"
        data-height="270"
        title="juicyBanner"
      ></ins>
      <Script
        id="window.adsbyjuicy-banner"
        type="text/javascript"
        data-cfasync="false"
        async
      >{`(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1033717});`}</Script>
    </>
  );
};
export default JuicyBanner;
