import { useContext } from "react";

import { routerContext } from "../contexts/router";

export const useRouter = () => useContext(routerContext);
