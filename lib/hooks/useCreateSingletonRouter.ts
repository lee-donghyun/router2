import { useContext } from "react";

import { configContext } from "../contexts/config";
import { historyContext, setHistoryContext } from "../contexts/history";
import { History } from "../types";
import { make } from "../utils";

export const useCreateSingletonRouter = (path: string | undefined) => {
  const history = useContext(historyContext);
  const setHistory = useContext(setHistoryContext);
  const { on } = useContext(configContext);

  const navigate = (next: History, options?: { replace?: boolean }) => {
    const url = next.query
      ? `${next.pathname}?${new URLSearchParams(next.query).toString()}`
      : next.pathname;
    const internalNext = make(next, "navigate");

    if (on?.beforeNavigate) {
      on.beforeNavigate({ prev: history, next: internalNext, options });
    }

    setHistory(internalNext);

    options?.replace
      ? window.history.replaceState(internalNext, "", url)
      : window.history.pushState(internalNext, "", url);
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
    navigate,
    pathname: history.pathname,
    params: getParams(),
  };
};
