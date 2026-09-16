// Prefijo del subdirectorio donde vive la app (en GitHub Pages es /<repo>/).
// En un dominio propio BASE_URL es "/" y withBase() no cambia nada.
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export function withBase(path) {
  if (!path || !path.startsWith("/")) return path;
  if (BASE && path.startsWith(BASE + "/")) return path;
  return BASE + path;
}

export function navigateTo(path) {
  window.history.pushState({}, "", withBase(path));
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function handleInternalNavigation(event, href) {
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
  if (href.startsWith("#")) return;

  event.preventDefault();
  navigateTo(href);
}
