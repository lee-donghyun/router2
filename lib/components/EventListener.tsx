import { useContext, useEffect } from "react";

import { initialHistory, setHistoryContext } from "../contexts/history";
import { History } from "../types";

export const EventListener = ({ children }: { children: React.ReactNode }) => {
  const setHistory = useContext(setHistoryContext);
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      setHistory((e.state as History | undefined) ?? initialHistory);
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [setHistory]);
  return <>{children}</>;
};
