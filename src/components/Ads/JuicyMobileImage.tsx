import Script from "next/script";
import React, { useEffect } from "react";

type JuicyMobileImageProps = {};

const JuicyMobileImage: React.FC<JuicyMobileImageProps> = () => {
  useEffect(() => {
    const juicyAdsBanner = document.getElementById("window.adsbyjuicy-banner");
    if (juicyAdsBanner) {
      juicyAdsBanner.addEventListener("touchstart", (event: TouchEvent) => {}, {
        passive: true,
      });
    }
  }, []);
  return (
    <>
      {" "}
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
    </>
  );
};
export default JuicyMobileImage;
