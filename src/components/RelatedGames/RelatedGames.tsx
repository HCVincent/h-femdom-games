import { GameTag } from "@/atoms/gamesAtom";
import useGames from "@/hooks/useGames";
import React, { useEffect, useState } from "react";
import GamesVerticalList from "../GamesLists/GamesVerticalList/GamesVerticalList";
import Image from "next/image";
import default_cover from "../../../public/default_cover.png";
import { useRouter } from "next/router";

type RelatedGamesProps = {
  gameTag: string;
};

const RelatedGames: React.FC<RelatedGamesProps> = ({ gameTag }) => {
  const { readGamesByTag, gameStateValue } = useGames();
  const router = useRouter();
  const handleOnReadGames = async () => {
    try {
      await readGamesByTag(gameTag, 3);
    } catch (error) {
      console.log("handleOnReadGames error", error);
    }
  };
  useEffect(() => {
    handleOnReadGames();
  }, []);
  return (
    <div className="flex flex-col ">
      <span className="text-4xl font-bold">More Games</span>
      {gameStateValue.gamesInTag.map((game) => (
        <div
          className="card card-compact w-96 bg-base-100 shadow-xl my-5 cursor-pointer hover:scale-105 transition-all"
          key={game.id}
          onClick={() => router.push(`/games/${game.id}`)}
        >
          <figure>
            <Image
              width={500}
              height={300}
              src={game.coverImage ? game.coverImage : default_cover}
              alt={game.title}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title capitalize">{game.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RelatedGames;
