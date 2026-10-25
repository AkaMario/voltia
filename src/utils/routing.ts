const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function toAppPath(pathname: string) {
  if (!basePath || pathname === basePath || pathname === `${basePath}/`) {
    return "/";
  }

  return pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length)
    : pathname || "/";
}

export function toBrowserPath(path: string) {
  if (!basePath) return path;
  return path === "/" ? `${basePath}/` : `${basePath}${path}`;
}
