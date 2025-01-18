import { InternalHistory, History } from "./types";

export const initializeBrowserHistory = () => {
  if (window.location.pathname.endsWith("/")) {
    history.replaceState(undefined, "", window.location.pathname.slice(0, -1));
  }
};

export const matchDynamicRoute = (path: string, pathname: string) => {
  const isDynamicRoute = /\/:/g.test(path);
  if (isDynamicRoute) {
    const pathes = path.match(/[^/]+/g) ?? [];
    const pathnames = pathname.match(/[^/]+/g) ?? [];
    if (pathes.length !== pathnames.length) return false;
    for (let i = 0; i < pathes.length; i++) {
      if (pathes[i] !== pathnames[i] && !pathes[i].startsWith(":")) {
        return false;
      }
    }
    return true;
  }
  return path === pathname;
};

export const disableBrowserScrollRestoration = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
};

export const make = (
  history: History,
  type: InternalHistory["type"],
): InternalHistory => {
  const now = Date.now();
  return {
    pushedAt: now,
    // pushedAt이 이미 있는 경우 덮어쓰지 않는다.
    ...history,
    madeAt: now,
    type,
  };
};
