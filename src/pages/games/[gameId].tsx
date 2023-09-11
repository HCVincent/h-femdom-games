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
    setGameStateValue((prev) => ({
      ...prev,
      selectedGame: null,
    }));
    const { gameId } = router.query;
    if (gameId) {
      fetchGame(gameId as string);
    }
  }, [router.query]);

  useEffect(() => {
    // Get the ads container element
    const adsContainer = document.getElementById("adsContainerImg");

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
          <div className="relative h-[50rem]">
            <Image
              alt=""
              src={girls1}
              width={500}
              height={500}
              className="absolute z-1 top-0"
            />
            <div className="chat chat-start absolute right-0 z-50">
              <div className="chat-bubble w-[12rem]">
                {`Hi there, adorable puppy! 🐶 Would you be kind as to click on
                ads for me? I just know you'd love to, wouldn't you? 😊`}
              </div>
            </div>
            <div
              id="adsContainerImg"
              className="absolute  z-2  m-auto left-0 top-0 right-0 bottom-0 w-[158px] h-[180px]"
            ></div>
          </div>

          {game && game.tags && (
            <RelatedGames
              gameTag={game.tags[Math.floor(Math.random() * game.tags.length)]}
            />
          )}
        </div>
      </PageContent>
    </div>
  );
};
export default GamePage;
