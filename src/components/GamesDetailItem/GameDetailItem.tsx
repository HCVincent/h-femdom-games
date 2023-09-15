import { Game } from "@/atoms/gamesAtom";
import React, { useEffect } from "react";
import GameCover from "./GameCover";
import moment from "moment";
import { User } from "firebase/auth";
import Comments from "./Comments/Comments";
import ThumbsLike from "../IndexPageContent/Recommendation/ThumbsLike";
import useGames from "@/hooks/useGames";
import TagsCardList from "../Tags/TagsCardList";

type GameDetailItemProps = { game: Game; user: User };

const GameDetailItem: React.FC<GameDetailItemProps> = ({ game, user }) => {
  const { onSelectGame, gameStateValue, onVote, onCollect } = useGames();
  useEffect(() => {
    // Add the ads script dynamically to the adsContainer-exoclick div
    const adsContainer = document.getElementById("adsBanner-exoclick");
    if (adsContainer) {
      const script = document.createElement("script");
      script.src = "https://a.magsrv.com/ad-provider.js";
      script.type = "application/javascript";
      script.async = true;

      const ins = document.createElement("ins");
      ins.className = "eas6a97888e";
      ins.setAttribute("data-zoneid", "5077944");
      ins.setAttribute(
        "data-keywords",
        "cartoon,games,foot,foot fetish,femdom,female dominance"
      );

      const pushScript = document.createElement("script");
      pushScript.textContent = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;

      adsContainer.appendChild(script);
      adsContainer.appendChild(ins);
      adsContainer.appendChild(pushScript);
    }
  }, []);
  return (
    <div className="flex flex-col  p-10">
      <GameCover coverImage={game.coverImage} imagesGroup={game.imagesGroup} />
      <div className="flex flex-col mt-10  justify-between">
        <span className=" text-4xl font-bold capitalize lg:text-6xl">
          {game.title}
        </span>
        <div className="w-[40rem] mt-4">
          <ThumbsLike
            userVoteValue={
              gameStateValue.gameVotes.find((vote) => vote.gameId === game.id)
                ?.voteValue
            }
            game={game}
            userCollectionValue={
              gameStateValue.gameCollections.find(
                (collection) => collection.gameId === game.id
              )?.gameId
            }
            onCollect={onCollect}
            onVote={onVote}
          />
        </div>
      </div>

      {game.createdAt && (
        <span className="text-xs m-1">
          {moment(new Date(game.createdAt?.seconds * 1000)).fromNow()}
        </span>
      )}
      {game.tags && <TagsCardList tags={game.tags} />}
      {game.password && <span className="text-4xl">UnzipCode:</span>}
      {game.password && (
        <span className="text-4xl text-red-600">{game.password}</span>
      )}
      <div id="adsBanner-exoclick" className="flex h-[250px] w-[300px]"></div>
      <span className="mt-10">{game.body}</span>
      <Comments game={game} user={user} />
    </div>
  );
};
export default GameDetailItem;
