"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";
import { useGameMetrics } from "@/hooks/useGameMetrics";

const ResultsPage = () => {
  const router = useRouter();

  const { bestScore, clicks, resetGame } = useGameMetrics();
  const isBest = clicks <= bestScore;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Game Results 🎉</h1>
      <p className="text-lg mt-2">Total Clicks: {clicks}</p>

      {isBest ? (
        <p className="text-green-600 font-semibold">
          🏆 New Best Score! Well done!
        </p>
      ) : (
        <p className="text-blue-600">
          Try again to beat your best score of {bestScore}!
        </p>
      )}

      <PrimaryButton
        type="button"
        onClick={() => {
          resetGame();
          router.push("/");
        }}
      >
        Play Again
      </PrimaryButton>
    </div>
  );
};

export default ResultsPage;
