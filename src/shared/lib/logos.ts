const LOGO_DEV_KEY = "pk_eaCPMYIqR6K-jVaSEtek6A";

/** Get a crypto token logo URL from logo.dev */
export function cryptoLogo(ticker: string, size = 64): string {
  return `https://img.logo.dev/crypto/${ticker.toUpperCase()}?token=${LOGO_DEV_KEY}&size=${size}`;
}

/** Get a company/domain logo URL from logo.dev */
export function domainLogo(domain: string, size = 64): string {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_KEY}&size=${size}&format=png`;
}

/* ── Preload cache ────────────────────────────────────────────────────── */

const preloaded = new Set<string>();

/** Preload a logo into the browser cache via <link rel="preload"> */
function preload(url: string) {
  if (preloaded.has(url) || typeof document === "undefined") return;
  preloaded.add(url);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = url;
  document.head.appendChild(link);
}

/** Preload a batch of crypto logos */
export function preloadCryptoLogos(tickers: string[], size = 64) {
  tickers.forEach((t) => preload(cryptoLogo(t, size)));
}

/** Preload a batch of domain logos */
export function preloadDomainLogos(domains: string[], size = 64) {
  domains.forEach((d) => preload(domainLogo(d, size)));
}
