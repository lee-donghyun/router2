import { useContext, useEffect } from "react";

import { configContext } from "../contexts/config";
import { setHistoryContext } from "../contexts/history";
import { InternalHistory } from "../types";
import { make } from "../utils";

export const usePopStateEvent = () => {
  const { on } = useContext(configContext);
  const setHistory = useContext(setHistoryContext);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      setHistory((prev) => {
        const history = e.state as InternalHistory;
        const type = prev.pushedAt < history.pushedAt ? "push" : "pop";
        const nextHistory = make(history, type);
        const handler =
          on?.[({ push: "beforePush", pop: "beforePop" } as const)[type]];
        if (handler) {
          handler({ next: nextHistory, prev });
        }
        return nextHistory;
      });
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [on, setHistory]);
};
