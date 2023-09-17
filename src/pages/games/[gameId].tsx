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
        <div className="flex  w-full">
          {gameStateValue.selectedGame && (
            <GameDetailItem
              game={gameStateValue.selectedGame}
              user={user as User}
            />
          )}
        </div>
        <div className=" w-full  lg:flex lg:flex-col pl-5"></div>
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
