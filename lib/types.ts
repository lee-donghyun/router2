import { ReactNode } from "react";

export interface History {
  pathname: string;
  query?: Record<string, string>;
}

export interface InternalHistory extends History {
  pushedAt: number;
  madeAt: number;
  type: "push" | "pop" | "navigate" | "initialize";
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

interface Event {
  prev: InternalHistory;
  next: InternalHistory;
}

export interface Config {
  on?: {
    beforeNavigate?: (event: {
      prev: InternalHistory;
      next: InternalHistory;
      options?: NavigateOptions;
    }) => void;
    afterNavigate?: (event: {
      current: InternalHistory;
      options?: NavigateOptions;
    }) => void;

    beforePop?: (event: {
      prev: InternalHistory;
      next: InternalHistory;
    }) => void;
    afterPop?: (event: { current: InternalHistory }) => void;

    beforePush?: (event: {
      prev: InternalHistory;
      next: InternalHistory;
    }) => void;
    afterPush?: (event: { current: InternalHistory }) => void;
  };
}
