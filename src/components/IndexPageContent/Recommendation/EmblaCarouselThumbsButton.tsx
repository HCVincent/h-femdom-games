import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  imgSrc: string;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props;

  return (
    <div
      className={"flex w-full embla-thumbs__slide justify-center bg-black".concat(
        selected ? " embla-thumbs__slide--selected " : ""
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button relative"
        type="button"
      >
        <Image
          className={`flex object-cover h-full w-auto embla-thumbs__slide__img  ${
            selected ? "" : "opacity-50"
          }`}
          src={imgSrc}
          width={60}
          height={60}
          alt={index.toString()}
        />
      </button>
    </div>
  );
};
