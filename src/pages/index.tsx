import RecommendationLists from "@/components/IndexPageContent/Recommendation/RecommendationLists";
import TagsCategories from "@/components/IndexPageContent/TagsCategories.tsx/TagsCategories";
//@ts-ignore
import { Game, gameState } from "@/atoms/gamesAtom";
import FullPage from "@/components/Ads/FullPage";
import { firestore } from "@/firebase/clientApp";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
// @ts-ignore
import safeJsonStringify from "safe-json-stringify";
import { useSetRecoilState } from "recoil";

const BannerUnderTags = dynamic(
  () => import("@/components/Ads/BannerUnderTags")
);
const GamesGridList = dynamic(
  () => import("../components/GamesLists/GamesGridList/GamesGridList")
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
  const setGameStateValue = useSetRecoilState(gameState);
  useEffect(() => {
    setGameStateValue((prev) => ({
      ...prev,
      gameRecommendations: recommendations as Game[],
    }));
  }, [recommendations]);

  return (
    <div className="flex flex-col w-full items-center mt-5">
      <div className="flex flex-col w-full justify-center  lg:w-5/6">
        <RecommendationLists />
        {/* <TagsCategories /> */}
        <BannerUnderTags />
        <GamesGridList games={games} documentSnapShot={documentSnapShot} />
      </div>
      <FullPage />
      {/* <PopUnder /> */}
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
