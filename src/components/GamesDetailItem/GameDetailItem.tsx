import { Game, gameState } from "@/atoms/gamesAtom";
import React, { useEffect } from "react";
import moment from "moment";
import Comments from "./Comments/Comments";
import ThumbsLike from "../IndexPageContent/Recommendation/ThumbsLike";
import useGames from "@/hooks/useGames";
import TagsCardList from "../Tags/TagsCardList";
import Script from "next/script";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

type GameDetailItemProps = { game: Game };
const GameCover = dynamic(() => import("./GameCover"), {
  ssr: false,
});
const GameDetailItem: React.FC<GameDetailItemProps> = ({ game }) => {
  const gameStateValue = useRecoilValue(gameState);
  const [user] = useAuthState(auth);

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
      <div id="adsBanner-exoclick" className="flex h-[250px] w-[300px]">
        <Script
          type="application/javascript"
          async
          src="https://a.magsrv.com/ad-provider.js"
        ></Script>
        <ins
          className="eas6a97888e"
          data-zoneid="5077944"
          data-keywords="cartoon,games,foot,foot fetish,femdom,female dominance"
        ></ins>
        <Script id="window.adsbyjuicy-banner-detail">{`(AdProvider = window.AdProvider || []).push({"serve": {}});`}</Script>
      </div>
      <span className="mt-10 line">{game.body}</span>
      {user && <Comments game={game} user={user} />}
    </div>
  );
};
export default GameDetailItem;
