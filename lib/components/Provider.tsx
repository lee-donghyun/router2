import { ReactNode, useState } from "react";

import { initialHistory } from "../contant";
import { configContext } from "../contexts/config";
import { historyContext, setHistoryContext } from "../contexts/history";
import { Config } from "../types";

export const Provider = ({
  children,
  config = {},
}: {
  children: ReactNode;
  config: Config | undefined;
}) => {
  const [history, setHistory] = useState(initialHistory);
  return (
    <configContext.Provider value={config}>
      <historyContext.Provider value={history}>
        <setHistoryContext.Provider value={setHistory}>
          {children}
        </setHistoryContext.Provider>
      </historyContext.Provider>
    </configContext.Provider>
  );
};
