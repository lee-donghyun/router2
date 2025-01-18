import { InternalHistory } from "./types";
import { make } from "./utils";

export const initialHistory: InternalHistory = (() => {
  const url = new URL(window.location.href);
  if (url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return make(
    {
      pathname: url.pathname,
      query: url.search
        ? Object.fromEntries(url.searchParams.entries())
        : undefined,
    },
    "initialize",
  );
})();
