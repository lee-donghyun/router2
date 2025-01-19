import { useContext, useLayoutEffect, useRef } from "react";

import { configContext } from "../contexts/config";
import { historyContext } from "../contexts/history";

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
    if (on?.afterReplace && history.type === "replace") {
      on.afterReplace({ current: history });
    }
    if (on?.afterBack && history.type === "back") {
      on.afterBack({ current: history });
    }
    if (on?.afterForward && history.type === "forward") {
      on.afterForward({ current: history });
    }
    handledMadeAtSet.current.add(history.madeAt);
  }, [history, on]);
};
