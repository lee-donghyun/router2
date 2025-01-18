import { ReactNode, useContext, useEffect } from "react";

import { initialHistory, setHistoryContext } from "../contexts/history";
import { InternalHistory } from "../types";
import { configContext } from "../contexts/config";
import { make } from "../utils";

export const EventListener = ({ children }: { children: ReactNode }) => {
  const { on } = useContext(configContext);
  const setHistory = useContext(setHistoryContext);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const history =
        (e.state as InternalHistory | undefined) ?? initialHistory;

      setHistory((current) => {
        const type = current.pushedAt < history.pushedAt ? "push" : "pop";
        if (on?.[type]) {
          on[type]({ next: history, prev: current });
        }
        return history;
      });
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [setHistory, on]);
  return children;
};
