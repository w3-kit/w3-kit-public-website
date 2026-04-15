import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getSubdomain } from "./app/middleware";

/**
 * On subdomain hosts (e.g. ui.localhost:3000/bridge) the browser path is
 * "/bridge" but TanStack Router expects "/ui/bridge".  The server already
 * rewrites for SSR — this helper does the same for the client so the
 * router can match the correct route during hydration.
 */
function ensureSubdomainPrefix() {
  if (typeof window === "undefined") return;

  const host = window.location.host;
  const subdomain = getSubdomain(host);

  if (subdomain !== "landing" && !window.location.pathname.startsWith(`/${subdomain}`)) {
    const prefixed = `/${subdomain}${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.history.replaceState(null, "", prefixed);
  }
}

export function getRouter() {
  ensureSubdomainPrefix();

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
