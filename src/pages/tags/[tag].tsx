import GamesVerticalList from "@/components/GamesLists/GamesVerticalList/GamesVerticalList";
import PageContent from "@/components/Layout/PageContent";
import useGames from "@/hooks/useGames";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
//@ts-ignore
import safeJsonStringify from "safe-json-stringify";
import { GetServerSidePropsContext } from "next";
import {
  query,
  collection,
  orderBy,
  where,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  Query,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { Game } from "@/atoms/gamesAtom";
type TagPageProps = {
  documentSnapShot: QueryDocumentSnapshot<DocumentData>;
  games: Game[];
  tag: string;
};
const TagPage: React.FC<TagPageProps> = ({ games, tag }) => {
  const { setGameStateValue, gameStateValue } = useGames();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGameStateValue((prev) => ({
      ...prev,
      gamesInTag: games as Game[],
    }));
  }, []);
  return (
    <div className="flex w-full justify-center items-center">
      <PageContent>
        <div className="justify-start w-full">
          <div className="w-full">
            <span className="px-10 text-2xl">{tag} Games</span>
            {loading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              <GamesVerticalList games={gameStateValue.gamesInTag} />
            )}
          </div>
        </div>
        <div className="flex w-full h-full justify-center items-center">
          <Script
            async
            type="application/javascript"
            src="https://a.magsrv.com/ad-provider.js"
          ></Script>
          <ins className="eas6a97888e" data-zoneid="5078966"></ins>
          <Script id="tags-sticky-banner">{`(AdProvider = window.AdProvider || []).push({"serve": {}});`}</Script>
        </div>
      </PageContent>
    </div>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    context.res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=59"
    );
    const tag = context.query.tag;
    const gameQuery = query(
      collection(firestore, "games"),
      orderBy("updatedAt", "desc"),
      where("tags", "array-contains", tag)
    );

    const gameDocs = await getDocs(gameQuery);
    const games = gameDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return {
      props: {
        games: JSON.parse(safeJsonStringify(games)),
        tag: JSON.parse(safeJsonStringify(tag)),
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
}
export default TagPage;
