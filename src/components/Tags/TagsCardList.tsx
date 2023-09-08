import React from "react";
import TagCard from "./TagCard";

type TagsCardListProps = {
  tags: string[];
};

const TagsCardList: React.FC<TagsCardListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap h-[12rem] lg:h-[10rem] overflow-hidden">
      {tags.map((tag) => (
        <TagCard tag={tag} key={tag}></TagCard>
      ))}
    </div>
  );
};
export default TagsCardList;
