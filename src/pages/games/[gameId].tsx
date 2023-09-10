import { Game } from "@/atoms/gamesAtom";
import GameDetailItem from "@/components/GamesDetailItem/GameDetailItem";
import PageContent from "@/components/Layout/PageContent";
import RelatedGames from "@/components/RelatedGames/RelatedGames";
import { auth, firestore } from "@/firebase/clientApp";
import useGames from "@/hooks/useGames";
import { User } from "@firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
        <div className=" w-full  lg:flex lg:flex-col p-10 ml-10">
          <div
            id="adsContainerImg"
            className="flex justify-center items-center z-0"
          ></div>
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
