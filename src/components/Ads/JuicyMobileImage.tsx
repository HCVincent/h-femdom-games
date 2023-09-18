import Script from "next/script";
import React from "react";

type JuicyMobileImageProps = {};

const JuicyMobileImage: React.FC<JuicyMobileImageProps> = () => {
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
