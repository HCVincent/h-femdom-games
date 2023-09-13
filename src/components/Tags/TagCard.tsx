import Link from "next/link";
import React from "react";

type TagCardProps = {
  tag: string;
};

const TagCard: React.FC<TagCardProps> = ({ tag }) => {
  return (
    <div className="max-w-[14rem] ">
      <div className="w-auto m-0 p-1">
        <Link
          className="text-xl text-slate-400  w-auto m-0 btn capitalize"
          href={`/tags/${tag}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {tag}
        </Link>
      </div>
    </div>
  );
};
export default TagCard;
