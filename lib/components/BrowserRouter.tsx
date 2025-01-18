import { useOnce } from "../hooks/useOnce";
import { BrowserRouterProps, RouterProps } from "../types";
import {
  disableBrowserScrollRestoration,
  initializeBrowserHistory,
} from "../utils";
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
