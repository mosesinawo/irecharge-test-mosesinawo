import { shuffleArray } from "@/services";
import { ICard } from "@/types/card.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  cards: ICard[];
  selectedCards: number[];
  clicks: number;
  bestScore: number;
  isGameOngoing: boolean;
}

const initialState: GameState = {
  cards: [],
  selectedCards: [],
  clicks: 0,
  bestScore: Infinity,
  isGameOngoing: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
    selectCard: (state, action: PayloadAction<number>) => {
      state.selectedCards.push(action.payload);
    },
    resetSelectedCards: (state) => {
      state.selectedCards = [];
    },
    incrementClicks: (state) => {
      state.clicks += 1;
    },
    setBestScore: (state, action: PayloadAction<number>) => {
      state.bestScore = action.payload;
      localStorage.setItem("bestScore", action.payload.toString());
    },
    setGameStatus: (state, action: PayloadAction<boolean>) => {
      state.isGameOngoing = action.payload;
    },
    resetGame: (state) => {
      state.cards = shuffleArray(state.cards.map((card) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      })));
      state.selectedCards = [];
      state.clicks = 0;
      state.isGameOngoing = true;
    },

  },
});

export const {
  setCards,
  selectCard,
  resetSelectedCards,
  incrementClicks,
  setBestScore,
  setGameStatus,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
