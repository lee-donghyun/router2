export const matchDynamicRoute = (path: string, pathname: string) => {
  const isDynamicRoute = /\/:/g.test(path);
  if (isDynamicRoute) {
    const pathes = path.match(/[^/]+/g) ?? [];
    const pathnames = pathname.match(/[^/]+/g) ?? [];
    if (pathes.length !== pathnames.length) return false;
    for (let i = 0; i < pathes.length; i++) {
      if (pathes[i] !== pathnames[i] && !pathes[i].startsWith(":")) {
        return false;
      }
    }
    return true;
  }
  return path === pathname;
};
