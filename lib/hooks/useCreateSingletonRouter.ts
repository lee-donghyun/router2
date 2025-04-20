import { useContext } from "react";

import { configContext } from "../contexts/config";
import { historyContext, setHistoryContext } from "../contexts/history";
import { History, Router } from "../types";
import { getParams, make } from "../utils";

export const useCreateSingletonRouter = (path: string | undefined): Router => {
  const history = useContext(historyContext);
  const setHistory = useContext(setHistoryContext);
  const { on } = useContext(configContext);

  const push = (next: History) => {
    const url = next.query
      ? `${next.pathname}?${new URLSearchParams(next.query).toString()}`
      : next.pathname;
    const internalNext = make(next, "push");

    const apply = () => {
      setHistory(internalNext);
      window.history.pushState(internalNext, "", url);
    };

    if (on?.beforePush) {
      on.beforePush({ prev: history, next: internalNext }, apply);
    } else {
      apply();
    }
  };
  const replace = (next: History) => {
    const url = next.query
      ? `${next.pathname}?${new URLSearchParams(next.query).toString()}`
      : next.pathname;
    const internalNext = make(next, "replace");

    const apply = () => {
      setHistory(internalNext);
      window.history.replaceState(internalNext, "", url);
    };

    if (on?.beforeReplace) {
      on.beforeReplace({ prev: history, next: internalNext }, apply);
    } else {
      apply();
    }
  };

  return {
    path,
    push,
    replace,
    pathname: history.pathname,
    params: getParams(history, path),
  };
};
