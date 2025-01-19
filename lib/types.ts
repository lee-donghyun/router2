import { ReactNode } from "react";

export interface History {
  pathname: string;
  query?: Record<string, string>;
}

export interface InternalHistory extends History {
  pushedAt: number;
  madeAt: number;
  type: "forward" | "back" | "push" | "replace" | "initialize";
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

interface BeforeEvent {
  prev: InternalHistory;
  next: InternalHistory;
}

interface AfterEvent {
  current: InternalHistory;
}

export interface Config {
  on?: {
    beforePush?: (event: BeforeEvent, next: () => void) => void;
    afterPush?: (event: AfterEvent) => void;

    beforeReplace?: (event: BeforeEvent, next: () => void) => void;
    afterReplace?: (event: AfterEvent) => void;

    beforeBack?: (event: BeforeEvent, next: () => void) => void;
    afterBack?: (event: AfterEvent) => void;

    beforeForward?: (event: BeforeEvent, next: () => void) => void;
    afterForward?: (event: AfterEvent) => void;
  };
}
