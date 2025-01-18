import { useOnce } from "../hooks/useOnce";
import { RouterProps } from "../types";
import {
  disableBrowserScrollRestoration,
  initializeBrowserHistory,
} from "../utils";
import { EventListener } from "./EventListener";
import { Provider } from "./Provider";
import { Router } from "./Router";

export const BrowserRouter = (props: RouterProps) => {
  useOnce(() => {
    initializeBrowserHistory();
    disableBrowserScrollRestoration();
  });
  return (
    <Provider>
      <EventListener>
        <Router {...props} />
      </EventListener>
    </Provider>
  );
};
