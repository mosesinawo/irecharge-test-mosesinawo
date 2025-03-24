import { useEffect } from "react";
import { setCards, resetSelectedCards } from "@/state/slices/gameSlice";
import { Dispatch } from "redux";

const useMatchChecker = (
  selectedCards: number[],
  cards: any[],
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        const [first, second] = selectedCards;
        if (cards[first]?.image === cards[second]?.image) {
           // If the selected cards match, mark them as matched
          dispatch(
            setCards(
              cards.map((card, i) =>
                i === first || i === second
                  ? { ...card, isMatched: true }
                  : card
              )
            )
          );
        } else {
           // If they don't match, flip them back
          dispatch(
            setCards(
              cards.map((card, i) =>
                i === first || i === second
                  ? { ...card, isFlipped: false }
                  : card
              )
            )
          );
        }
          // Reset the selected cards after the check
        dispatch(resetSelectedCards());
      }, 2000); // Delay to allow the player to see the cards
    }
  }, [selectedCards, cards, dispatch]);
};

export default useMatchChecker;
