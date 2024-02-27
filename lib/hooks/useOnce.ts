import { useEffect } from "react";

export const useOnce = (cb: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
};
