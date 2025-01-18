import { History, InternalHistory } from "./types";

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
