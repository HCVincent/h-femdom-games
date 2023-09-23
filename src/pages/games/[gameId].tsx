import { Game } from "@/atoms/gamesAtom";
import PageContent from "@/components/Layout/PageContent";
import RelatedGames from "@/components/RelatedGames/RelatedGames";
import { firestore } from "@/firebase/clientApp";
import useGames from "@/hooks/useGames";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const ImageInDetailPage = dynamic(
  () => import("../../components/Ads/ImageInDetailPage"),
  {
    ssr: false,
  }
);
const GameDetailItem = dynamic(
  () => import("../../components/GamesDetailItem/GameDetailItem"),
  {
    ssr: false,
  }
);
const GamePage: React.FC = () => {
  const router = useRouter();
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
            <GameDetailItem game={gameStateValue.selectedGame} />
          )}
        </div>
        <div className=" w-full  lg:flex lg:flex-col pl-5 h-[160rem] ">
          <ImageInDetailPage />
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
