import React, {
  AnchorHTMLAttributes,
  createContext,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type History = {
  pathname: string;
  query?: Record<string, string>;
};

type RouterProps = {
  routes: Record<string, () => JSX.Element> & Record<"/404", () => JSX.Element>;
  match: (pathname: string) => string;
};

const initialHistory: History = {
  pathname: window.location.pathname,
  query: window.location.search
    ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
    : undefined,
};

const historyContext = createContext<History>(initialHistory);
const setHistoryContext = createContext<Dispatch<SetStateAction<History>>>(
  () => {}
);

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
      setHistory(e.state || initialHistory);
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);
  return <>{children}</>;
};

const Router = ({ routes, match }: RouterProps) => {
  const { pathname } = useContext(historyContext);
  const Page = routes?.[match(pathname)] || routes["/404"];
  return <Page />;
};

export const BrowserRouter = ({ ...props }: RouterProps) => {
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
  ...ancorProps
}: History &
  Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "href"
  >) => {
  const setHistory = useContext(setHistoryContext);
  const url = query ? `${pathname}?${new URLSearchParams(query)}` : pathname;
  const data = { pathname, query };
  return (
    <a
      {...ancorProps}
      href={url}
      onClick={(e) => {
        e.preventDefault();
        setHistory(data);
        history.pushState(data, "", url);
        ancorProps.onClick?.(e);
      }}
    />
  );
};
