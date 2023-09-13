import GamesGridList from "@/components/GamesLists/GamesGridList/GamesGridList";
import RecommendationLists from "@/components/IndexPageContent/Recommendation/RecommendationLists";
import TagsCategories from "@/components/IndexPageContent/TagsCategories.tsx/TagsCategories";
import React from "react";
import { NextApiRequest, NextApiResponse } from "next";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full items-center mt-5">
      <div className="flex flex-col w-full justify-center lg:w-5/6">
        <RecommendationLists />
        <TagsCategories />
        <GamesGridList />
      </div>
    </div>
  );
};

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  res.setHeader(
    "Cache-Control",
    "public, max-age=300, s-maxage=600, stale-while-revalidate=59"
  );

  return {
    props: {},
  };
}
export default Home;
