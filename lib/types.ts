import { ReactNode } from "react";

export interface History {
  pathname: string;
  query?: Record<string, string>;
}

export interface InternalHistory extends History {
  pushedAt: number;
  madeAt: number;
  type: "foward" | "back" | "push" | "replace" | "initialize";
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
  push: (history: History) => void;
  replace: (history: History) => void;
  pathname: string;
  params: Record<string, string>;
}

export interface Config {
  on?: {
    beforePush?: (event: {
      prev: InternalHistory;
      next: InternalHistory;
    }) => void;
    afterPush?: (event: { current: InternalHistory }) => void;

    beforeReplace?: (event: {
      prev: InternalHistory;
      next: InternalHistory;
    }) => void;
    afterReplace?: (event: { current: InternalHistory }) => void;

    beforeBack?: (event: {
      prev: InternalHistory;
      next: InternalHistory;
    }) => void;
    afterBack?: (event: { current: InternalHistory }) => void;

    beforeFoward?: (event: {
      prev: InternalHistory;
      next: InternalHistory;
    }) => void;
    afterFoward?: (event: { current: InternalHistory }) => void;
  };
}
