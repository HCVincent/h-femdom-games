import AdminModal from "@/Modal/Admin/AdminModal";
import TagCard from "@/components/Tags/TagCard";
import useGames from "@/hooks/useGames";
import React, { useState } from "react";
// import GamesRead from "./GamesRead";

const TagsCrud: React.FC = () => {
  const { onSelectGame, gameStateValue, setGameStateValue } = useGames();
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex ">
        {gameStateValue.gameTags.map((tag) => (
          <TagCard tag={tag.title} key={tag.id}></TagCard>
        ))}
      </div>
    </div>
  );
};
export default TagsCrud;
