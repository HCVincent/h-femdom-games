import Link from "next/link";
import React from "react";

type TagCardProps = {
  tag: string;
};

const TagCard: React.FC<TagCardProps> = ({ tag }) => {
  return (
    <Link
      className="flex max-w-[14rem] m-1 text-lg text-slate-400 w-auto btn capitalize"
      href={`/tags/${tag}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {tag}
    </Link>
  );
};
export default TagCard;
