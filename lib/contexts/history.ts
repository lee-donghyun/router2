import { createContext, Dispatch, SetStateAction } from "react";

import { History } from "../types";

export const initialHistory: History = {
  pathname: window.location.pathname,
  query: window.location.search
    ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
    : undefined,
};
export const historyContext = createContext<History>(initialHistory);

export const setHistoryContext = createContext<
  Dispatch<SetStateAction<History>>
>(() => {
  throw new Error("setHistoryContext is not defined");
});
