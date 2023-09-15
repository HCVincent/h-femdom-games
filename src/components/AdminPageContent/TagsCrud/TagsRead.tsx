import AdminModal from "@/Modal/Admin/AdminModal";
import TagCard from "@/components/Tags/TagCard";
import useGames from "@/hooks/useGames";
import React, { useState } from "react";
// import GamesRead from "./GamesRead";

const TagsRead: React.FC = () => {
  const { onSelectGame, gameStateValue, setGameStateValue } = useGames();
  return (
    <div className="flex flex-wrap h-[12rem] lg:h-[10rem] overflow-hidden">
      {gameStateValue.gameTags.map((tag) => (
        <TagCard tag={tag.title} key={tag.id}></TagCard>
      ))}
    </div>
  );
};
export default TagsRead;
