import React from "react";
import { useEffect, useState } from "react";
import { setCards, resetSelectedCards } from "@/state/slices/gameSlice";
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
// import { Dialog } from "@material-tailwind/react";

const GameOverview = () => {
  const dispatch = useDispatch();
  const { cards, selectedCards, isGameOngoing } = useSelector(
    (state: RootState) => state.game
  );
  const [isInitializing, setIsInitializing] = useState(true);
  const [time, setTime] = useState(0);
  const { clicks, bestScore, incrementClicks, resetGame } = useGameMetrics();
//   const [showModal, setShowModal] = useState(false);
//   const handleOpen = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

  useBeforeUnload(isGameOngoing);
  useEffect(() => {
    generateCards(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        const [first, second] = selectedCards;
        if (cards[first].image === cards[second].image) {
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
        dispatch(resetSelectedCards());
      }, 2000);
    }
  }, [selectedCards, cards, dispatch]);

  const handleCardClick = useCardClick(cards, selectedCards, incrementClicks);
  const handleResetGame = () => {
    resetGame();
    setTime(0);
    // handleClose();
  };
  if (isInitializing) {
    return <Initializer onComplete={() => setIsInitializing(false)} />;
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Memory Matching Game</h1>
        <Timer
          isGameRunning={isGameOngoing}
          onTimeUpdate={(time) => console.log(`Time: ${time}s`)}
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
        <PrimaryButton type="button" onClick={handleResetGame}>
          RESTART GAME
        </PrimaryButton>
      </div>
      {/* <Dialog open={showModal} handler={handleClose} size="sm" className="">
        <div className="text-center bg-white w-[500px]">
          <h2 className="text-xl font-bold">Are you sure you want to reset?</h2>
          <div className="flex gap-4">
            <PrimaryButton onClick={handleResetGame}>Yes</PrimaryButton>
            <PrimaryButton onClick={handleClose}>No</PrimaryButton>
          </div>
        </div>
      </Dialog> */}
    </div>
  );
};

export default GameOverview;
