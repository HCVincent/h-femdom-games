import { Game, gameState } from "@/atoms/gamesAtom";
import moment from "moment";
import React, { useState } from "react";
import questionmark from "../../../../public/questionmark.png";
import ThumbsLike from "@/components/IndexPageContent/Recommendation/ThumbsLike";
import Link from "next/link";
import TagsCardList from "@/components/Tags/TagsCardList";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
type GamesGridItemProps = {
  game: Game;
  userCollectionValue?: string;
  onCollect: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Game
  ) => Promise<boolean>;
  onSelectGame: (game: Game) => void;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Game,
    vote: number
  ) => Promise<boolean>;
};

const GamesGridItem: React.FC<GamesGridItemProps> = ({
  game,
  userCollectionValue,
  onCollect,
  onSelectGame,
  userVoteValue,
  onVote,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const setGameStateValue = useSetRecoilState(gameState);
  return (
    <div className="flex w-[28rem]">
      <Link
        href={`/games/${game.id}`}
        target="_blank"
        onClick={() => {
          setGameStateValue((prev) => ({
            ...prev,
            selectedGame: game,
          }));
        }}
      >
        <div className="card  bg-base-100 shadow-xl h-[34rem]  hover:scale-105 transition-all ">
          <figure className="h-52 w-full items-start">
            {imageLoading && (
              <div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
            <Image
              src={game.coverImage ? game.coverImage : questionmark.src}
              alt={"cover"}
              width={200}
              height={200}
              className="w-full object-cover rounded-lg cursor-pointer"
              onLoad={() => setImageLoading(false)}
            />
          </figure>
          <div className="card-body cursor-pointer flex flex-col h-48 m-0 p-2">
            <h2 className="card-title  text-xl justify-start top-0 align-top items-start capitalize line-clamp-2">
              {game.title}
            </h2>
            <span className="flex text-slate-500 text-sm">
              {game.createdAt &&
                `updated at ${moment(
                  new Date(game.createdAt.seconds * 1000)
                ).fromNow()}`}
            </span>

            <div className="flex flex-1">
              {game.tags && <TagsCardList tags={game.tags} />}
            </div>

            <ThumbsLike
              userVoteValue={userVoteValue}
              game={game}
              userCollectionValue={userCollectionValue}
              onCollect={onCollect}
              onVote={onVote}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GamesGridItem;
