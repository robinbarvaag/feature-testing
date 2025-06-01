const frameAncestors = ["localhost:3000", "*.YOURDOMAIN.com"].join(" ");

const mediaSrc = ["cdn.sanity.io"].filter((e) => e).join(" ");

const iframeSrcs = [
  "*.youtube-nocookie.com",
  "*.youtube.com",
  "player.vimeo.com",
  "www.google.com",
]
  .filter((e) => e)
  .join(" ");

const fontSrc = ["fonts.gstatic.com", "*.hotjar.com"]
  .filter((e) => e)
  .join(" ");

const imgSrc = [
  "maps.googleapis.com",
  "maps.gstatic.com",
  "www.facebook.com",
  "*.hotjar.com",
  "ssl.google-analytics.com",
  "stats.g.doubleclick.net",
]
  .filter((e) => e)
  .join(" ");

const scriptSrc = ["*.hotjar.com"].filter((e) => e).join(" ");

const scriptSrcElem = [
  "cdn.jsdelivr.net",
  "connect.facebook.net",
  "maps.googleapis.com",
  "player.vimeo.com",
  "s.ytimg.com",
  "www.youtube.com",
  "ssl.google-analytics.com ",
  "static.hotjar.com",
  "www.googletagmanager.com",
  "www.google.com",
  "www.gstatic.com",
]
  .filter((e) => e)
  .join(" ");

const styleSrc = ["*.hotjar.com"].filter((e) => e).join(" ");

const styleSrcElem = ["fonts.googleapis.com"].filter((e) => e).join(" ");

const connectSrc = [
  "*.algolia.net",
  "*.algolianet.com",
  "*.algolia.io",
  "www.facebook.com",
  "*.hotjar.com",
  "*.hotjar.io",
  "wss://*.hotjar.com",
]
  .filter((e) => e)
  .join(" ");

const ContentSecurityPolicy = `
    default-src 'self' 'unsafe-eval';
    media-src 'self' ${mediaSrc};
    frame-ancestors 'self' ${frameAncestors};
    frame-src 'self' ${iframeSrcs};
    font-src 'self' ${fontSrc};
    img-src 'self' data: ${imgSrc};
    script-src 'self' 'unsafe-inline' 'unsafe-eval' ${scriptSrc};
    script-src-elem 'self' 'unsafe-inline' ${scriptSrcElem};
    style-src 'self' 'unsafe-inline' ${styleSrc};
    style-src-elem 'self' 'unsafe-inline' ${styleSrcElem};
    connect-src 'self' ${connectSrc};
    style-src-attr 'unsafe-inline';
`;

const internalSecurityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

module.exports = internalSecurityHeaders;
