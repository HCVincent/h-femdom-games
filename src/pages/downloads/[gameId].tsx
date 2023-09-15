import { Game } from "@/atoms/gamesAtom";
import { firestore } from "@/firebase/clientApp";
import useGames from "@/hooks/useGames";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Script from "next/script";

type DownloadPage = {};

const DownloadPage: React.FC<DownloadPage> = () => {
  const router = useRouter();
  const { gameStateValue, setGameStateValue } = useGames();
  const game: Game = gameStateValue.selectedGame!;
  const [timeLeft, setTimeLeft] = useState(5);
  const [toDownload, setToDownload] = useState(false);
  const [clickedAds, setClickedAds] = useState(false);
  const [leftText, setLeftText] = useState("");
  const rightText1 = `You know how to serve me, right?~`;
  const rightText2 = `Good puppy ❤❤❤`;
  useEffect(() => {}, [clickedAds]);
  useEffect(() => {
    // Exit if the timer reaches zero
    if (timeLeft <= 0) {
      setToDownload(true);
      return;
    }

    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => {
      setToDownload(false);
      clearInterval(timer);
    };
  }, [timeLeft]);

  const fetchGame = async (gameId: string) => {
    try {
      const gameDocRef = doc(firestore, "games", gameId);
      const gameDoc = await getDoc(gameDocRef);
      setGameStateValue((prev) => ({
        ...prev,
        selectedGame: { id: gameDoc.id, ...gameDoc.data() } as Game,
      }));
    } catch (error) {
      console.log("fetchGame error", error);
    }
  };

  useEffect(() => {
    const { gameId } = router.query;
    if (gameId && !gameStateValue.selectedGame) {
      fetchGame(gameId as string);
    }
  }, [router.query, gameStateValue.selectedGame]);

  return (
    <div className="flex flex-col w-5/6 h-[calc(50vw-14rem)] mb-20 justify-center items-center">
      <div
        id="adsContainer-exoclick"
        className="hidden lg:flex h-[26rem] w-[72rem]"
        onClick={() => {
          setClickedAds(true);
        }}
      >
        <Script
          type="application/javascript"
          async
          src="https://a.magsrv.com/ad-provider.js"
        ></Script>
        <ins
          className="eas6a97888e"
          data-zoneid="5076330"
          data-keywords="cartoon,games,foot,foot fetish,femdom,female dominance"
        ></ins>
        <Script id="window.adsbyjuicy-banner-detail">{`(AdProvider = window.AdProvider || []).push({"serve": {}});`}</Script>
      </div>
      <div className="flex  w-full h-[60rem] justify-center items-center mt-10">
        <div className="relative flex-1 h-full"></div>
        <div className="flex flex-col flex-1 w-full h-full justify-center items-center">
          {" "}
          <span className="countdown font-mono text-6xl">
            <span style={{ "--value": timeLeft } as React.CSSProperties}></span>
          </span>
          <div>
            {game && (
              <button
                className="btn btn-lg"
                disabled={!toDownload}
                onClick={() => {
                  window.open(`${game.address}`, "_blank");
                }}
              >
                Download
              </button>
            )}
          </div>
        </div>
        <div className="relative flex-1  h-full ">
          <Image
            alt=""
            src={clickedAds ? "/girls/Pov7.png" : "/girls/Full1.png"}
            width={clickedAds ? 300 : 200}
            height={clickedAds ? 300 : 100}
            className="absolute top-[4rem] lg:top-[2rem] left-[2rem] hidden lg:flex"
          />
          <div className="chat chat-end lg:chat-start absolute lg:left-[22rem] hidden lg:flex">
            <div className="chat-bubble w-[12rem]">
              {clickedAds ? rightText2 : rightText1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DownloadPage;
