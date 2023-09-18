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
import Script from "next/script";

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

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto justify-center">
      <PageContent>
        <div className="flex  w-full h-[120rem] lg:h-[160rem] ">
          {gameStateValue.selectedGame && (
            <GameDetailItem
              game={gameStateValue.selectedGame}
              user={user as User}
            />
          )}
        </div>
        <div className=" w-full  lg:flex lg:flex-col pl-5 h-[160rem] ">
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
          {game && game.tags && (
            <RelatedGames
              gameTag={game.tags[Math.floor(Math.random() * game.tags.length)]}
              gameId={game.id!}
            />
          )}
        </div>
      </PageContent>
      {/* Desktop Fullpage Interstitial */}
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
    </div>
  );
};

export default GamePage;
