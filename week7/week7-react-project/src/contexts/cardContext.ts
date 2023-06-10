import { createContext } from "react";

interface CardContext {
  isCardsFlipped: boolean[];
  setIsCardsFlipped: (item: boolean[]) => void;
}

export const CardContext = createContext<CardContext>({
  isCardsFlipped: [],
  setIsCardsFlipped: () => console.log("hi"),
});
