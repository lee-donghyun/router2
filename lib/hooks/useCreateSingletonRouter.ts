import { useContext } from "react";

import { historyContext, setHistoryContext } from "../contexts/history";
import { History } from "../types";

export const useCreateSingletonRouter = (path: string | undefined) => {
  const history = useContext(historyContext);
  const setHistory = useContext(setHistoryContext);
  const navigate = (history: History, options?: { replace?: boolean }) => {
    const url = history.query
      ? `${history.pathname}?${new URLSearchParams(history.query).toString()}`
      : history.pathname;
    setHistory(history);
    options?.replace
      ? window.history.replaceState(history, "", url)
      : window.history.pushState(history, "", url);
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
