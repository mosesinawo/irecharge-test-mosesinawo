"use client";
import GameOverview from "@/features/GameOverview";
import { store } from "@/state/store";
import { Provider } from "react-redux";


export default function Home() {


  return (
    <Provider store={store}>
     <GameOverview/>
    </Provider>
  );
}


