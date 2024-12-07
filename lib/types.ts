import { ReactNode } from "react";

export interface History {
  pathname: string;
  query?: Record<string, string>;
}

export interface RouterProps {
  routes: Record<string, () => ReactNode> & Record<"/404", () => ReactNode>;
  children?: (Page: () => ReactNode) => ReactNode;
}

export interface Router {
  path: string | undefined;
  navigate: (
    history: History,
    options?: {
      replace?: boolean;
    },
  ) => void;
  pathname: string;
  params: Record<string, string>;
}
