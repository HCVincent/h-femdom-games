import Script from "next/script";
import React from "react";

type PopUnderProps = {};

const PopUnder: React.FC<PopUnderProps> = () => {
  return (
    <>
      {" "}
      <Script
        type="application/javascript"
        id="adsContainerClick"
      >{`var ad_idzone = "5077642",
  ad_popup_fallback = true,
  ad_popup_force = false,
  ad_chrome_enabled = true,
  ad_new_tab = true,
  ad_frequency_period = 60,
  ad_frequency_count = 1,
  ad_trigger_method = 3,
  ad_trigger_delay = 0;`}</Script>
      <Script
        src="https://a.pemsrv.com/popunder1000.js"
        type="application/javascript"
      />
    </>
  );
};
export default PopUnder;
