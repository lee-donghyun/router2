import { useEffect } from "react";

export const useOnce = (cb: () => void) => {
  useEffect(cb, []);
};
