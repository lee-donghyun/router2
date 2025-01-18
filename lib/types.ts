import { ReactNode } from "react";

export interface History {
  pathname: string;
  query?: Record<string, string>;
}

export interface InternalHistory extends History {
  pushedAt: number;
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
    navigate?: (event: Event & { options?: NavigateOptions }) => void;
    pop?: (event: Event) => void;
    push?: (event: Event) => void;
  };
}
