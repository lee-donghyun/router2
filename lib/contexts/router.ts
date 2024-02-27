import { createContext } from "react";

import { Router } from "../types";

export const routerContext = createContext<Router>({} as Router);
