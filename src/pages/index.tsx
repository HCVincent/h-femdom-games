import GamesGridList from "@/components/GamesLists/GamesGridList/GamesGridList";
import RecommendationLists from "@/components/IndexPageContent/Recommendation/RecommendationLists";
import TagsCategories from "@/components/IndexPageContent/TagsCategories.tsx/TagsCategories";
import React from "react";

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

export default Home;
