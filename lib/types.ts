export type History = {
  pathname: string;
  query?: Record<string, string>;
};

export type RouterProps = {
  routes: Record<string, () => JSX.Element> & Record<"/404", () => JSX.Element>;
};

export type Router = {
  path: string | undefined;
  navigate: (
    history: History,
    options?: {
      replace?: boolean;
    },
  ) => void;
  pathname: string;
  params: Record<string, string>;
};
