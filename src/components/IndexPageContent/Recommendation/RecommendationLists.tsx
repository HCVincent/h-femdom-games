import useGames from "@/hooks/useGames";
import { EmblaOptionsType } from "embla-carousel-react";
import { DocumentData, Query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import EmblaCarousel from "./EmblaCarousel";

type RecommendationListsProps = {};
const OPTIONS: EmblaOptionsType = { loop: true };
const RecommendationLists: React.FC<RecommendationListsProps> = () => {
  const { readGames } = useGames();

  let next: Query<DocumentData>;
  const [loading, setLoading] = useState(false);
  const { gameStateValue } = useGames();

  const handleOnReadGames = async () => {
    setLoading(true);
    try {
      await readGames("recommendations");
    } catch (error) {
      console.log("handleOnReadGames error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleOnReadGames();
  }, []);

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
