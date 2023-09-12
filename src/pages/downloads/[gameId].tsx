import { Game } from "@/atoms/gamesAtom";
import useGames from "@/hooks/useGames";
import React from "react";

type DownloadPage = {};

const DownloadPage: React.FC<DownloadPage> = () => {
  const { gameStateValue } = useGames();
  const game: Game = gameStateValue.selectedGame!;
  return <div>{game.address}</div>;
};
export default DownloadPage;
