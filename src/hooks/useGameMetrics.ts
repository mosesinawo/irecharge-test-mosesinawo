import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  setBestScore,
  incrementClicks,
  resetGame,
  setGameStatus,
} from "@/state/slices/gameSlice";
import { ICard } from "@/types/card.types";

export const useGameMetrics = () => {
  const dispatch = useDispatch();
  const { clicks, bestScore, cards } = useSelector(
    (state: RootState) => state.game
  );

  useEffect(() => {
    const storedScore = Number(localStorage.getItem("bestScore")) || Infinity;
    dispatch(setBestScore(storedScore));
  }, [dispatch]);

  useEffect(() => {
    if (cards.length && cards.every((card:ICard) => card.isMatched)) {
      dispatch(setGameStatus(false));
      if (clicks < bestScore) {
        dispatch(setBestScore(clicks));
      }
    }
  }, [cards, clicks, bestScore, dispatch]);

  return {
    clicks,
    bestScore,
    incrementClicks: () => dispatch(incrementClicks()),
    resetGame: () => dispatch(resetGame()),
  };
};
