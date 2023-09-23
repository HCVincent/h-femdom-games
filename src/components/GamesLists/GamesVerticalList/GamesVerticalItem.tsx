import { Game, gameState } from "@/atoms/gamesAtom";
import moment from "moment";
import React, { useState } from "react";
import questionmark from "../../../../public/questionmark.png";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ThumbsLike from "@/components/IndexPageContent/Recommendation/ThumbsLike";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import TagsCardList from "@/components/Tags/TagsCardList";

type GamesVerticalItemProps = {
  game: Game;
  userVoteValue?: number;
  userCollectionValue?: string;

  onSelectGame: (game: Game) => void;
};

const GamesVerticalItem: React.FC<GamesVerticalItemProps> = ({
  game,
  userCollectionValue,
  onSelectGame,
  userVoteValue,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [like, setLike] = useState(false);
  const setGameStateValue = useSetRecoilState(gameState);
  return (
    <Link
      href={`/games/${game.id}`}
      onClick={() => {
        setGameStateValue((prev) => ({
          ...prev,
          selectedGame: game,
        }));
      }}
      className="card card-side bg-base-100 shadow-xl m-8 p-2 hover:scale-105 transition-all "
    >
      <figure className="flex flex-1 bg-black  ">
        {imageLoading && (
          <div className="flex w-full h-full items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        <Image
          src={game.coverImage ? game.coverImage : questionmark.src}
          alt={`cover${game.id}`}
          priority
          className="rounded-lg"
          width={200}
          height={200}
          onLoad={() => setImageLoading(false)}
        />
      </figure>{" "}
      <div className="flex flex-1 flex-col">
        {game.tags && <TagsCardList tags={game.tags} />}
        <div className="card-body cursor-pointer flex flex-1">
          <h2 className="card-title capitalize">{game.title}</h2>
          <p>
            {game.createdAt &&
              `updated at ${moment(
                new Date(game.createdAt.seconds * 1000)
              ).fromNow()}`}
          </p>
          <div className="card-actions justify-end">
            <ThumbsLike
              userVoteValue={userVoteValue}
              game={game}
              userCollectionValue={userCollectionValue}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default GamesVerticalItem;
