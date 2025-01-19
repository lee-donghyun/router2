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
        const type = prev.pushedAt < history.pushedAt ? "forward" : "back";
        const nextHistory = make(history, type);
        const handler =
          on?.[
            ({ forward: "beforeForward", back: "beforeBack" } as const)[type]
          ];

        let state = prev;
        const apply = () => {
          state = nextHistory;
        };
        if (handler) {
          handler({ next: nextHistory, prev }, apply);
        } else {
          apply();
        }
        return state;
      });
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [on, setHistory]);
};
