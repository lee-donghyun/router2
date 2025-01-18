import { initialHistory } from "../contant";

export const initializeBrowserHistory = () => {
  const url = new URL(window.location.href);
  if (url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  history.replaceState(initialHistory, "", url);
};

export const disableBrowserScrollRestoration = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
};
