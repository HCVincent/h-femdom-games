import { Game } from "@/atoms/gamesAtom";
import { NextRouter } from "next/router";
import React from "react";
import GamesVerticalItem from "./GamesVerticalItem";
import useGames from "@/hooks/useGames";

type GamesVerticalListProps = {
  games: Game[];
};

const GamesVerticalList: React.FC<GamesVerticalListProps> = ({ games }) => {
  const { gameStateValue, onCollect, onSelectGame, onVote } = useGames();
  return (
    <div className="flex flex-col w-full">
      {games &&
        games.map((item) => (
          <GamesVerticalItem
            key={item.id}
            game={item}
            userCollectionValue={
              gameStateValue.gameCollections.find(
                (collection) => collection.gameId === item.id
              )?.gameId
            }
            userVoteValue={
              gameStateValue.gameVotes.find((vote) => vote.gameId === item.id)
                ?.voteValue
            }
            onCollect={onCollect}
            onSelectGame={onSelectGame}
            onVote={onVote}
          />
          //   onClick={() => {
          //     router.push(`/games/${item.id}`);
          //   }}
          //   key={item.id}
        ))}
    </div>
  );
};
export default GamesVerticalList;
