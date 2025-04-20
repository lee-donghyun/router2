import { History, InternalHistory } from "./types";

export const make = (
  history: History,
  type: InternalHistory["type"],
): InternalHistory => {
  const now = Date.now();
  return {
    pushedAt: now,
    // pushedAt이 이미 있는 경우 덮어쓰지 않는다. (popState에서 사용)
    ...history,
    madeAt: now,
    type,
  };
};

export const getParams = (history: History, path: string | undefined) => {
  const pathParams = path
    ?.split("/")
    .map((path, index) => [path, index] as const)
    .filter(([path]) => path.startsWith(":"));
  const pathnames = history.pathname.split("/");
  return {
    ...history.query,
    ...Object.fromEntries(
      pathParams?.map(([path, index]) => [path, pathnames[index]]) ?? [],
    ),
  };
};
