import { createContext, Dispatch, SetStateAction } from "react";

import { History, InternalHistory } from "../types";
import { make } from "../utils";

export const initialHistory: InternalHistory = make({
  pathname: window.location.pathname,
  query: window.location.search
    ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
    : undefined,
});
export const historyContext = createContext<InternalHistory>(initialHistory);

export const setHistoryContext = createContext<
  Dispatch<SetStateAction<InternalHistory>>
>(() => {
  throw new Error("setHistoryContext is not defined");
});
