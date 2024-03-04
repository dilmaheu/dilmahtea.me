export default function CSPRecord({ dev = false } = {}) {
  const CSPRecord = {
    "default-src": ["'none'"],
    "style-src": ["'self'", "'unsafe-inline'", "https://use.fontawesome.com"],
    "img-src": ["'self'", "data:", "https://dilmahtea.me"],
    "media-src": ["'self'", "data:"],
    "font-src": ["'self'", "https://use.fontawesome.com"],
    "worker-src": ["blob:"],
    "connect-src": [
      "'self'",
      "https://baserow.scripts.dilmahtea.me",
      "https://js.stripe.com",
      "https://api.openreplay.com",
      "https://analytics.scripts.dilmahtea.me",
    ],
    "upgrade-insecure-requests": [],
    "script-src": ["'self'", "https://js.stripe.com", "https://static.openreplay.com"],
    "manifest-src": ["'self'"],
    "frame-src": ["'self'", "https://js.stripe.com"],
  };

  if (dev) {
    CSPRecord["script-src"].push("'unsafe-inline'", "'unsafe-eval'");
  }

  return CSPRecord;
}
