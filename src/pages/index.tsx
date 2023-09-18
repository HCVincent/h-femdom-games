import GamesGridList from "@/components/GamesLists/GamesGridList/GamesGridList";
import RecommendationLists from "@/components/IndexPageContent/Recommendation/RecommendationLists";
import TagsCategories from "@/components/IndexPageContent/TagsCategories.tsx/TagsCategories";
//@ts-ignore
import safeJsonStringify from "safe-json-stringify";
import useGames from "@/hooks/useGames";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { firestore } from "@/firebase/clientApp";
import { Game } from "@/atoms/gamesAtom";
import PopUnder from "@/components/Ads/PopUnder";
import dynamic from "next/dynamic";

const BannerUnderTags = dynamic(
  () => import("@/components/Ads/BannerUnderTags")
);

type RecommendationListsProps = {
  recommendations: Game[];
  documentSnapShot: QueryDocumentSnapshot<DocumentData>;
  games: Game[];
};
const Home: React.FC<RecommendationListsProps> = ({
  recommendations,
  documentSnapShot,
  games,
}) => {
  const { setGameStateValue, setLastVisible } = useGames();
  useEffect(() => {
    setGameStateValue((prev) => ({
      ...prev,
      gameRecommendations: recommendations as Game[],
    }));
  }, [recommendations]);
  useEffect(() => {
    setGameStateValue((prev) => ({
      ...prev,
      games: games as Game[],
    }));
    setLastVisible(documentSnapShot);
  }, [games]);

  return (
    <div className="flex flex-col w-full items-center mt-5">
      <div className="flex flex-col w-full justify-center  lg:w-5/6">
        <RecommendationLists />
        <TagsCategories />
        <BannerUnderTags />
        <GamesGridList />
      </div>
      <PopUnder />
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
    const gameRecQuery = query(
      collection(firestore, "recommendations"),
      orderBy("updatedAt", "desc"),
      limit(9)
    );
    const gameRecDocs = await getDocs(gameRecQuery);
    const recommendations = gameRecDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const gameQuery = query(
      collection(firestore, "games"),
      orderBy("updatedAt", "desc"),
      limit(9)
    );
    const gameDocs = await getDocs(gameQuery);
    const documentSnapShot = gameDocs.docs[gameDocs.docs.length - 1];
    const games = gameDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return {
      props: {
        recommendations: JSON.parse(safeJsonStringify(recommendations)),
        documentSnapShot: JSON.parse(safeJsonStringify(documentSnapShot)),
        games: JSON.parse(safeJsonStringify(games)),
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
}
export default Home;
