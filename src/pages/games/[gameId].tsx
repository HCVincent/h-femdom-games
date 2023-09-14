import { Game } from "@/atoms/gamesAtom";
import GameDetailItem from "@/components/GamesDetailItem/GameDetailItem";
import PageContent from "@/components/Layout/PageContent";
import RelatedGames from "@/components/RelatedGames/RelatedGames";
import { auth, firestore } from "@/firebase/clientApp";
import useGames from "@/hooks/useGames";
import { User } from "@firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import girls1 from "../../../public/girls/1.png";

declare global {
  interface Window {
    adsbyjuicy: {
      push(args: any): void;
    };
  }
}
const GamePage: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { gameStateValue, setGameStateValue } = useGames();
  const game: Game = gameStateValue.selectedGame!;

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

  useEffect(() => {
    // Get the ads container element
    const adsContainer = document.getElementById("adsContainerImg");
    const adsDesktopFullpage = document.getElementById("adsDesktopFullpage");

    if (adsContainer) {
      // Ads code here
      const script = document.createElement("script");
      script.src = "https://poweredby.jads.co/js/jads.js";
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      adsContainer.appendChild(script);

      const ins = document.createElement("ins");
      ins.id = "1033726";
      ins.setAttribute("data-width", "158");
      ins.setAttribute("data-height", "180");
      adsContainer.appendChild(ins);

      (window.adsbyjuicy = window.adsbyjuicy || []).push({ adzone: 1033726 });
    }

    if (adsDesktopFullpage) {
      // Ads code here
      const script = document.createElement("script");
      script.src = "https://a.pemsrv.com/fp-interstitial.js";
      script.type = "application/javascript";
      script.setAttribute("data-idzone", "5077870");
      script.setAttribute("data-ad_frequency_count", "1");
      script.setAttribute("data-ad_frequency_period", "60");
      script.setAttribute("data-type", "desktop");
      script.setAttribute("data-browser_settings", "1");
      script.setAttribute("data-ad_trigger_method", "3");
      adsDesktopFullpage.appendChild(script);

      const eventScript = document.createElement("script");
      eventScript.type = "application/javascript";
      eventScript.textContent = `document.addEventListener('creativeDisplayed-5077870', console.log, false);`;
      adsDesktopFullpage.appendChild(eventScript);
    }
    return () => {
      // Cleanup if necessary
    };
  }, []);
  return (
    <div className="flex flex-col lg:flex-row w-full  justify-center">
      <PageContent>
        <div className="flex  w-full">
          {gameStateValue.selectedGame && (
            <GameDetailItem
              game={gameStateValue.selectedGame}
              user={user as User}
            />
          )}
        </div>
        <div className=" w-full  lg:flex lg:flex-col pl-5">
          <div className="relative h-[50rem] z-10">
            <Image
              alt=""
              priority
              src={girls1}
              width={500}
              height={500}
              className="absolute z-1 top-0"
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
            ></div>
          </div>
          <div id="adsDesktopFullpage"></div>
          {game && game.tags && (
            <RelatedGames
              gameTag={game.tags[Math.floor(Math.random() * game.tags.length)]}
              gameId={game.id!}
            />
          )}
        </div>
      </PageContent>
    </div>
  );
};

export default GamePage;
