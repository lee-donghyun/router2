import { ReactNode } from "react";

export interface BrowserRouterProps extends RouterProps {
  config?: Config;
}

export interface Config {
  on?: {
    afterBack?: (event: AfterEvent) => void;
    afterForward?: (event: AfterEvent) => void;

    afterPush?: (event: AfterEvent) => void;
    afterReplace?: (event: AfterEvent) => void;

    beforeBack?: (event: BeforeEvent, next: () => void) => void;
    beforeForward?: (event: BeforeEvent, next: () => void) => void;

    beforePush?: (event: BeforeEvent, next: () => void) => void;
    beforeReplace?: (event: BeforeEvent, next: () => void) => void;
  };
}

export interface History {
  pathname: string;
  query?: Record<string, string>;
}

export interface InternalHistory extends History {
  madeAt: number;
  pushedAt: number;
  type: "back" | "forward" | "initialize" | "push" | "replace";
}

export interface Router {
  params: Record<string, string>;
  path: string | undefined;
  pathname: string;
  push: (history: History) => void;
  replace: (history: History) => void;
}

export interface RouterProps {
  children?: (Page: () => ReactNode) => ReactNode;
  routes: Record<"/404", () => ReactNode> & Record<string, () => ReactNode>;
}

interface AfterEvent {
  current: InternalHistory;
}

interface BeforeEvent {
  next: InternalHistory;
  prev: InternalHistory;
}
