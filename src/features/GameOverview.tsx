import React from "react";
import { useEffect, useState } from "react";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import Initializer from "@/components/Initializer";
import Card from "@/components/Card";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import useBeforeUnload from "@/hooks/useBeforeUnloaded";
import { generateCards } from "@/services";
import useCardClick from "@/hooks/useCardClick";
import PrimaryButton from "@/components/PrimaryButton";
import Timer from "@/components/Timer";
import useMatchChecker from "@/hooks/useMatchChecker";
import { useRouter } from "next/navigation";
import CustomDialog from "@/components/CustomDialog";

const GameOverview = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cards, selectedCards, isGameOngoing } = useSelector(
    (state: RootState) => state.game
  );
  const [isInitializing, setIsInitializing] = useState(true);
  const [time, setTime] = useState(0);
  const { clicks, bestScore, incrementClicks, resetGame } = useGameMetrics();
  const [isDialogOpen, setDialogOpen] = useState(false);

  //   * Custom hook to prevent accidental page reloads or navigation
  //  * when a game is ongoing.
  useBeforeUnload(isGameOngoing);

  // * Custom hook to fetch the images
  useEffect(() => {
    generateCards(dispatch);
  }, [dispatch]);

  // * Custom hook to check if selected cards match.
  useMatchChecker(selectedCards, cards, dispatch);

  // Custom hook to handle card click interactions.
  const handleCardClick = useCardClick(cards, selectedCards, incrementClicks);
  const handleResetGame = () => {
    console.log("i ran");
    resetGame();
    setTime(0);
    setDialogOpen(false);
  };

  useEffect(() => {
    if (cards.length && cards.every((card) => card.isMatched)) {
      setTimeout(() => {
        router.push(`/results`);
      }, 500);
    }
  }, [cards, clicks, bestScore, router]);

  if (isInitializing) {
    return <Initializer onComplete={() => setIsInitializing(false)} />;
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Memory Matching Game</h1>
        <Timer
          isGameRunning={isGameOngoing}
          time={time}
          setTime={setTime}
        />
        <div className="grid grid-cols-4 sm:gap-4 gap-3">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        <p className="text-lg">Clicks: {clicks}</p>
        {cards.length && cards.every((card) => card.isMatched) && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
            <h2 className="text-xl font-semibold">Game Over!</h2>
            <p>Total Clicks: {clicks}</p>
            {clicks === bestScore && (
              <p className="font-bold text-green-600">New Best Score!</p>
            )}
          </div>
        )}
        <PrimaryButton type="button" onClick={() => setDialogOpen(true)}>
          RESTART GAME
        </PrimaryButton>
      </div>
      <CustomDialog
        isOpen={isDialogOpen}
        title="Confirm Action"
        message="Are you sure you want to restart game?"
        onClose={() => setDialogOpen(false)}
        actions={
          <>
            <button
              onClick={() => setDialogOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleResetGame}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Confirm
            </button>
          </>
        }
      />
    </div>
  );
};

export default GameOverview;
