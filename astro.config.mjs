import { defineConfig } from "astro/config";
import PermissionsPolicy from "./src/store/PermissionsPolicy.js";

export default defineConfig({
  site: "https://dilmahtea.me",
  integrations: [
    sitemap({
      serialize(item) {
        if (/exclude-from-sitemap/.test(item.url)) {
          return undefined;
        }
        if (/your-special-page/.test(item.url)) {
          item.changefreq = 'daily';
          item.lastmod = new Date();
          item.priority = 0.9;
        }
        return item;
      },
    })
  ],
  vite: {
    plugins: [
      {
        name: "add-permissions-policy-header",
        configureServer: (server) => {
          server.middlewares.use((_req, res, next) => {
            res.setHeader("Permissions-Policy", PermissionsPolicy);
            next();
          });
        },
      },
    ],
  },
});
