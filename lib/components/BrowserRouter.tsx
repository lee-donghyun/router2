import { useOnce } from "../hooks/useOnce";
import { RouterProps } from "../types";
import { initializeBrowserHistory } from "../utils";
import { EventListener } from "./EventListener";
import { Provider } from "./Provider";
import { Router } from "./Router";

export const BrowserRouter = (props: RouterProps) => {
  useOnce(initializeBrowserHistory);
  return (
    <Provider>
      <EventListener>
        <Router {...props} />
      </EventListener>
    </Provider>
  );
};
