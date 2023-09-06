import React from "react";
import TagCard from "./TagCard";

type TagsCardListProps = {
  tags: string[];
};

const TagsCardList: React.FC<TagsCardListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap max-h-[8rem] overflow-hidden">
      {tags.map((tag) => (
        <TagCard tag={tag} key={tag}></TagCard>
      ))}
    </div>
  );
};
export default TagsCardList;
