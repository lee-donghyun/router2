import { useContext } from "react";

import { historyContext, setHistoryContext } from "../contexts/history";
import { History } from "../types";
import { configContext } from "../contexts/config";
import { make } from "../utils";

export const useCreateSingletonRouter = (path: string | undefined) => {
  const history = useContext(historyContext);
  const setHistory = useContext(setHistoryContext);
  const { on } = useContext(configContext);

  const navigate = (next: History, options?: { replace?: boolean }) => {
    const url = next.query
      ? `${next.pathname}?${new URLSearchParams(next.query).toString()}`
      : next.pathname;
    const internalNext = make(next);
    setHistory(internalNext);
    options?.replace
      ? window.history.replaceState(internalNext, "", url)
      : window.history.pushState(internalNext, "", url);
    if (on?.navigate) {
      on.navigate({ prev: history, next: internalNext, options });
    }
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
