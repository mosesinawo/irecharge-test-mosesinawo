// import { AppDispatch } from "@state/redux/store";
// import { setGameStatus, setCards } from "@/redux/gameSlice";
import { setCards, setGameStatus } from "@/state/slices/gameSlice";
import { AppDispatch } from "@/state/store";
import axios from "axios";

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const generateCards = async (dispatch: AppDispatch) => {
  dispatch(setGameStatus(true));
  try {
    const uniqueImages = await Promise.all(
      Array.from({ length: 8 }, (_, i) =>
        axios
          .get(`https://picsum.photos/200?random=${i + 1}`)
          .then((res) => res.request.responseURL)
      )
    );

    const cardPairs = uniqueImages.flatMap((img, i) => [
      { id: i * 2, image: img, isFlipped: false, isMatched: false },
      { id: i * 2 + 1, image: img, isFlipped: false, isMatched: false },
    ]);

    dispatch(setCards(shuffleArray(cardPairs)));
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};
