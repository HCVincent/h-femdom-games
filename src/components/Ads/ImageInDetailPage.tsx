import React from "react";
import girls1 from "../../../public/girls/1.png";
import Script from "next/script";
import Image from "next/image";
type ImageInDetailPageProps = {};
const ImageInDetailPage: React.FC<ImageInDetailPageProps> = () => {
  return (
    <div className="relative h-[50rem] w-full z-10 top-0">
      <Image
        alt=""
        priority
        src={girls1}
        width={500}
        height={500}
        className="absolute z-1 top-0 w-auto h-auto"
      />
      <div className="chat chat-start absolute right-0 ">
        <div className="chat-bubble w-[12rem]">
          {`Hi there, adorable puppy! 🐶 Would you be kind as to click on
                ads for me? I just know you'd love to, wouldn't you? 😊`}
        </div>
      </div>
      <div
        id="adsContainerImg"
        className="absolute m-auto z-10 left-0 top-0 right-0 bottom-0 w-[158px] h-[180px]"
      >
        <Script
          type="text/javascript"
          data-cfasync="false"
          async
          src="https://poweredby.jads.co/js/jads.js"
        ></Script>
        <ins
          id="1033726"
          data-width="158"
          data-height="180"
          className="w-[158px] h-[180px]"
        ></ins>
        <Script
          id="window.adsbyjuicy-banner"
          type="text/javascript"
          data-cfasync="false"
          async
        >{`(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1033726});`}</Script>
      </div>
    </div>
  );
};
export default ImageInDetailPage;
