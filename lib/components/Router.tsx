import { useContext } from "react";

import { historyContext } from "../contexts/history";
import { routerContext } from "../contexts/router";
import { useCreateSingletonRouter } from "../hooks/useCreateSingletonRouter";
import { RouterProps } from "../types";
import { matchDynamicRoute } from "./Router.helper";

export const Router = ({ routes, children }: RouterProps) => {
  const { pathname } = useContext(historyContext);
  const [path, Page] = Object.entries(routes)
    .sort((a, b) => (a[0] > b[0] ? -1 : 1))
    .find(([path]) => matchDynamicRoute(path, pathname)) ?? [
    undefined,
    routes["/404"],
  ];
  const router = useCreateSingletonRouter(path);
  return (
    <routerContext.Provider value={router}>
      {children ? children(Page) : <Page />}
    </routerContext.Provider>
  );
};
