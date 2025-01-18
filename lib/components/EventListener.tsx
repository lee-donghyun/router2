import { ReactNode } from "react";

import { useAfterEvent } from "../hooks/useAfterEvent";
import { usePopStateEvent } from "../hooks/usePopStateEvent";

export const EventListener = ({ children }: { children: ReactNode }) => {
  usePopStateEvent();
  useAfterEvent();
  return children;
};
