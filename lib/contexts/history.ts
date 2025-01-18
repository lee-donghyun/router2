import { createContext, Dispatch, SetStateAction } from "react";

import { initialHistory } from "../contant";
import { InternalHistory } from "../types";

export const historyContext = createContext<InternalHistory>(initialHistory);

export const setHistoryContext = createContext<
  Dispatch<SetStateAction<InternalHistory>>
>(() => {
  throw new Error("setHistoryContext is not defined");
});
