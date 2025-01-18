import { useContext, useLayoutEffect, useRef } from "react";
import { historyContext } from "../contexts/history";
import { configContext } from "../contexts/config";

export const useAfterEvent = () => {
  const history = useContext(historyContext);
  const { on } = useContext(configContext);
  const handledMadeAtSet = useRef(new Set<number>());
  useLayoutEffect(() => {
    if (handledMadeAtSet.current.has(history.madeAt)) {
      return;
    }
    if (on?.afterPush && history.type === "push") {
      on.afterPush({ current: history });
    }
    if (on?.afterPop && history.type === "pop") {
      on.afterPop({ current: history });
    }
    if (on?.afterNavigate && history.type === "navigate") {
      on.afterNavigate({ current: history });
    }
    handledMadeAtSet.current.add(history.madeAt);
  }, [history, on]);
};
