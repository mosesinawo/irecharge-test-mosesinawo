import Image from "next/image";
import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  card: { id: number; image: string; isFlipped: boolean; isMatched: boolean };
  onClick: (index: number) => void;
  index: number;
}

const Card: FC<CardProps> = ({ card, onClick, index }) => {
  return (
    <div
      key={card.id}
      className={twMerge(
        "w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-300",
        card.isFlipped ? "rotate-y-180" : ""
      )}
      onClick={() => onClick(index)}
    >
      {card.isFlipped || card.isMatched ? (
        <Image
          src={card.image}
          alt="Card"
          width={100}
          height={100}
          className="rounded-lg"
        />
      ) : (
        <div className="w-full h-full bg-gray-400 rounded-lg"></div>
      )}
    </div>
  );
};

export default Card;
