import { useOnce } from "../hooks/useOnce";
import { BrowserRouterProps } from "../types";
import {
  disableBrowserScrollRestoration,
  initializeBrowserHistory,
} from "./BrowserRouter.helper";
import { EventListener } from "./EventListener";
import { Provider } from "./Provider";
import { Router } from "./Router";

export const BrowserRouter = ({ config, ...props }: BrowserRouterProps) => {
  useOnce(() => {
    initializeBrowserHistory();
    disableBrowserScrollRestoration();
  });
  return (
    <Provider config={config}>
      <EventListener>
        <Router {...props} />
      </EventListener>
    </Provider>
  );
};
