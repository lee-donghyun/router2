export interface History {
  pathname: string;
  query?: Record<string, string>;
}

export interface RouterProps {
  routes: Record<string, () => JSX.Element> & Record<"/404", () => JSX.Element>;
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
