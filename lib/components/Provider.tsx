import { useState } from "react";

import {
  historyContext,
  initialHistory,
  setHistoryContext,
} from "../contexts/history";
import { History } from "../types";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<History>(initialHistory);
  return (
    <historyContext.Provider value={history}>
      <setHistoryContext.Provider value={setHistory}>
        {children}
      </setHistoryContext.Provider>
    </historyContext.Provider>
  );
};
