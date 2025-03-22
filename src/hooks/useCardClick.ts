import { selectCard, setCards } from "@/state/slices/gameSlice";
import { ICard } from "@/types/card.types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";


const useCardClick = (
  cards: ICard[],
  selectedCards: number[],
  incrementClicks: () => void
) => {
  const dispatch = useDispatch();

  return useCallback((index: number) => {
      if (
        selectedCards.length < 2 &&
        !cards[index].isFlipped &&
        !cards[index].isMatched
      ) {
        dispatch(
          setCards(
            cards.map((card, i) =>
              i === index ? { ...card, isFlipped: true } : card
            )
          )
        );
        dispatch(selectCard(index));
        incrementClicks();
      }
    },
    [cards, selectedCards, dispatch, incrementClicks]
  );
};

export default useCardClick;
