import { ReactNode } from "react";

export interface History {
  pathname: string;
  query?: Record<string, string>;
}

export interface NavigateOptions {
  replace?: boolean;
}

export interface RouterProps {
  routes: Record<string, () => ReactNode> & Record<"/404", () => ReactNode>;
  children?: (Page: () => ReactNode) => ReactNode;
}

export interface BrowserRouterProps extends RouterProps {
  config?: Config;
}

export interface Router {
  path: string | undefined;
  navigate: (history: History, options?: NavigateOptions) => void;
  pathname: string;
  params: Record<string, string>;
}

type NavigateMiddleware = (
  nextNavigate: Router["navigate"],
) => (current: History, next: History, options?: NavigateOptions) => void;
type PopStateMiddleware = (
  nextPopState: (history: History) => void,
) => (history: History, type: "pop" | "push") => void;
export interface Config {
  use?: {
    navigate?: NavigateMiddleware[];
    popState?: PopStateMiddleware[];
  };
}
