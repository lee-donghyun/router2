import { useContext } from "react";

import { configContext } from "../contexts/config";
import { historyContext, setHistoryContext } from "../contexts/history";
import { History, Router } from "../types";
import { make } from "../utils";

export const useCreateSingletonRouter = (path: string | undefined): Router => {
  const history = useContext(historyContext);
  const setHistory = useContext(setHistoryContext);
  const { on } = useContext(configContext);

  const push = (next: History) => {
    const url = next.query
      ? `${next.pathname}?${new URLSearchParams(next.query).toString()}`
      : next.pathname;
    const internalNext = make(next, "push");

    if (on?.beforePush) {
      on.beforePush({ prev: history, next: internalNext });
    }

    setHistory(internalNext);

    window.history.pushState(internalNext, "", url);
  };
  const replace = (next: History) => {
    const url = next.query
      ? `${next.pathname}?${new URLSearchParams(next.query).toString()}`
      : next.pathname;
    const internalNext = make(next, "replace");

    if (on?.beforeReplace) {
      on.beforeReplace({ prev: history, next: internalNext });
    }

    setHistory(internalNext);

    window.history.replaceState(internalNext, "", url);
  };
  const getParams = () => {
    const pathParams = path
      ?.split("/")
      .map((path, index) => [path, index] as const)
      .filter(([path]) => path.startsWith(":"));
    const pathnames = history.pathname.split("/");
    return {
      ...history.query,
      ...Object.fromEntries(
        pathParams?.map(([path, index]) => [path, pathnames[index]]) ?? [],
      ),
    };
  };

  return {
    path,
    push,
    replace,
    pathname: history.pathname,
    params: getParams(),
  };
};
