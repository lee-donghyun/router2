import {
  AnchorHTMLAttributes,
  createContext,
  DetailedHTMLProps,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  historyContext,
  initialHistory,
  setHistoryContext,
} from "./contexts/history";
import { useOnce } from "./hooks/useOnce";
import { History, Router, RouterProps } from "./types";
import { initializeBrowserHistory, matchDynamicRoute } from "./utils";

const routerContext = createContext<Router>({} as Router);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<History>(initialHistory);
  return (
    <historyContext.Provider value={history}>
      <setHistoryContext.Provider value={setHistory}>
        {children}
      </setHistoryContext.Provider>
    </historyContext.Provider>
  );
};

const EventListener = ({ children }: { children: React.ReactNode }) => {
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

const Router = ({ routes }: RouterProps) => {
  const { pathname } = useContext(historyContext);
  const [path, Page] = Object.entries(routes)
    .sort((a, b) => (a[0] > b[0] ? -1 : 1))
    .find(([path]) => matchDynamicRoute(path, pathname)) ?? [
    undefined,
    routes["/404"],
  ];
  const router = useCreateSingletonRouter(path);
  return (
    <routerContext.Provider value={router}>
      <Page />
    </routerContext.Provider>
  );
};

export const BrowserRouter = ({ ...props }: RouterProps) => {
  useOnce(initializeBrowserHistory);
  return (
    <Provider>
      <EventListener>
        <Router {...props} />
      </EventListener>
    </Provider>
  );
};

export const Link = ({
  pathname,
  query,
  replace,
  ...anchorProps
}: History & { replace?: boolean } & Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "href"
  >) => {
  const url = query
    ? `${pathname}?${new URLSearchParams(query).toString()}`
    : pathname;
  const router = useRouter();
  return (
    <a
      {...anchorProps}
      href={url}
      onClick={(e) => {
        e.preventDefault();
        router.navigate({ pathname, query }, { replace });
        anchorProps.onClick?.(e);
      }}
    />
  );
};

const useCreateSingletonRouter = (path: string | undefined) => {
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

export const useRouter = () => useContext(routerContext);
