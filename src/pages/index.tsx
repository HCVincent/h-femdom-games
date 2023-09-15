import GamesGridList from "@/components/GamesLists/GamesGridList/GamesGridList";
import RecommendationLists from "@/components/IndexPageContent/Recommendation/RecommendationLists";
import TagsCategories from "@/components/IndexPageContent/TagsCategories.tsx/TagsCategories";
//@ts-ignore
import safeJsonStringify from "safe-json-stringify";
import useGames from "@/hooks/useGames";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { firestore } from "@/firebase/clientApp";
import { Game } from "@/atoms/gamesAtom";
import Script from "next/script";
import BannerUnderTags from "@/components/Ads/BannerUnderTags";

type RecommendationListsProps = { games: Game[] };
const Home: React.FC<RecommendationListsProps> = ({ games }) => {
  const { setGameStateValue } = useGames();
  useEffect(() => {
    setGameStateValue((prev) => ({
      ...prev,
      gameRecommendations: games as Game[],
    }));
  }, [games]);

  return (
    <div className="flex flex-col w-full items-center mt-5">
      <div className="flex flex-col w-full justify-center  lg:w-5/6">
        <RecommendationLists />
        <TagsCategories />
        <BannerUnderTags />
        <GamesGridList />
      </div>
      <Script
        type="application/javascript"
        id="adsContainerClick"
      >{`var ad_idzone = "5077642",
      ad_popup_fallback = true,
      ad_popup_force = false,
      ad_chrome_enabled = true,
      ad_new_tab = true,
      ad_frequency_period = 60,
      ad_frequency_count = 1,
      ad_trigger_method = 3,
      ad_trigger_delay = 0;`}</Script>
      <Script
        src="https://a.pemsrv.com/popunder1000.js"
        type="application/javascript"
      />
    </div>
  );
};
export const revalidate = 59;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    context.res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=59"
    );
    const gameQuery = query(
      collection(firestore, "recommendations"),
      orderBy("updatedAt", "desc"),
      limit(9)
    );
    const gameDocs = await getDocs(gameQuery);
    const games = gameDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return {
      props: {
        games: JSON.parse(safeJsonStringify(games)),
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
}
export default Home;
