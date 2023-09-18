import { Game, gameState } from "@/atoms/gamesAtom";
import moment from "moment";
import Image from "next/image";
import React from "react";
import ThumbsLike from "./ThumbsLike";
import default_cover from "../../../../public/default_cover.png";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
type RecommendationItemProps = {
  game: Game;
  index: number;
  onSelectGame: (game: Game) => void;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Game,
    vote: number
  ) => Promise<boolean>;
  onCollect: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Game
  ) => Promise<boolean>;
  userVoteValue?: number;
  userCollectionValue?: string;
};

const RecommendationItem: React.FC<RecommendationItemProps> = ({
  game,
  index,
  onSelectGame,
  onVote,
  onCollect,
  userVoteValue,
  userCollectionValue,
}) => {
  const setGameStateValue = useSetRecoilState(gameState);
  return (
    <div
      id={`slide${index}`}
      className="embla__slide relative w-full h-[540px]  bg-slate-600 flex flex-col"
      key={game.id}
    >
      <div className="embla__slide__number">
        <span>{index + 1}</span>
      </div>
      <Link
        aria-label={`${game.title}`}
        href={`/games/${game.id}`}
        onClick={() => {
          setGameStateValue((prev) => ({
            ...prev,
            selectedGame: game,
          }));
        }}
        className="flex h-[480px] items-center bg-black align-middle justify-center "
      >
        <Image
          /* @ts-ignore */
          src={game.coverImage ? game.coverImage : default_cover}
          priority
          width={200}
          height={200}
          alt=""
          sizes="100vw"
          className="embla__slide__img inline-block object-cover lg:object-fill w-full h-auto lg:w-auto lg:h-full cursor-pointer"
        />
      </Link>

      <div className="flex flex-1 h-full items-center justify-between px-8">
        <div className="flex items-end p-2">
          <span className="text-2xl  text-white  line-clamp-2 lg:line-clamp-1 lg:text-4xl capitalize">
            {game.title}
          </span>
          <span className="ml-2 text-slate-500 hidden lg:flex">
            updated at{" "}
            {game.createdAt &&
              moment(new Date(game.createdAt.seconds * 1000)).fromNow()}
          </span>
        </div>
        <div className="flex-col flex-0 min-w-[20rem] hidden lg:flex">
          <ThumbsLike
            userVoteValue={userVoteValue}
            game={game}
            userCollectionValue={userCollectionValue}
            onCollect={onCollect}
            onVote={onVote}
          />
        </div>
      </div>
    </div>
  );
};
export default RecommendationItem;
