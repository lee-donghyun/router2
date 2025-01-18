import { ReactNode, useContext, useEffect } from "react";

import { initialHistory, setHistoryContext } from "../contexts/history";
import { InternalHistory } from "../types";
import { configContext } from "../contexts/config";
import { make } from "../utils";
import { useAfterEvent } from "../hooks/useAfterEvent";

export const EventListener = ({ children }: { children: ReactNode }) => {
  useAfterEvent();

  const { on } = useContext(configContext);
  const setHistory = useContext(setHistoryContext);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      setHistory((current) => {
        const history =
          (e.state as InternalHistory | undefined) ?? initialHistory;
        const type = current.pushedAt < history.pushedAt ? "push" : "pop";
        const nextHistory = make(history, type);
        const handler =
          on?.[({ push: "beforePush", pop: "beforePop" } as const)[type]];
        if (handler) {
          handler({ next: nextHistory, prev: current });
        }
        return nextHistory;
      });
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [setHistory, on]);
  return children;
};
