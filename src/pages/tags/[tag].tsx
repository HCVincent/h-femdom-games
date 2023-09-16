import GamesVerticalList from "@/components/GamesLists/GamesVerticalList/GamesVerticalList";
import PageContent from "@/components/Layout/PageContent";
import useGames from "@/hooks/useGames";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";

const TagPage: React.FC = () => {
  const router = useRouter();
  const { tag } = router.query;
  const [loading, setLoading] = useState(false);
  const { readGamesByTag, gameStateValue } = useGames();
  const handleOnReadGamesByTag = async () => {
    setLoading(true);
    try {
      if (tag) {
        await readGamesByTag(tag.toString());
      } else {
        throw new Error(`Sorry, the page is not ready`);
      }
    } catch (error) {
      console.log("handleOnReadGamesByTag error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleOnReadGamesByTag();
  }, [tag]);
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
export default TagPage;
