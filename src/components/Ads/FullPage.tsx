import Script from "next/script";
import React from "react";

type PopUnderProps = {};

const PopUnder: React.FC<PopUnderProps> = () => {
  return (
    <Script
      type="application/javascript"
      data-idzone="5077870"
      data-ad_frequency_count="1"
      data-ad_frequency_period="60"
      data-type="desktop"
      data-browser_settings="1"
      data-ad_trigger_method="3"
      src="https://a.pemsrv.com/fp-interstitial.js"
    ></Script>
  );
};
export default PopUnder;
