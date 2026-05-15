export function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function handleInternalNavigation(event, href) {
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
  if (href.startsWith("#")) return;

  event.preventDefault();
  navigateTo(href);
}
