export const initializeBrowserHistory = () => {
  if (window.location.pathname.endsWith("/")) {
    history.replaceState(undefined, "", window.location.pathname.slice(0, -1));
  }
};

export const matchDynamicRoute = (path: string, pathname: string) => {
  if (path.includes("/:")) {
    const pathes = path.split("/");
    const pathnames = pathname.split("/");
    return (
      pathes.length === pathnames.length &&
      pathnames.every((v, i) => v === pathes[i] || pathes[i].startsWith(":"))
    );
  }
  return path === pathname;
};
