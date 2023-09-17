import useGames from "@/hooks/useGames";
import { EmblaOptionsType } from "embla-carousel-react";
import React, { useState } from "react";
import EmblaCarousel from "./EmblaCarousel";

type RecommendationListsProps = {};
const OPTIONS: EmblaOptionsType = { loop: true };

const RecommendationLists: React.FC<RecommendationListsProps> = () => {
  const [loading, setLoading] = useState(false);
  const { gameStateValue } = useGames();

  return (
    <section className="sandbox__carousel mt-10">
      {loading ? (
        <div className="flex justify-center items-center ">
          <span className="loading loading-spinner w-[20rem] h-[20rem]"></span>
        </div>
      ) : (
        <EmblaCarousel
          slides={gameStateValue.gameRecommendations}
          options={OPTIONS}
        />
      )}
    </section>
  );
};

export default RecommendationLists;
