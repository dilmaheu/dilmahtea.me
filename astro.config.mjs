import sitemap from "@astrojs/sitemap";
import taiwlind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
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
          item.changefreq = "daily";
          item.lastmod = new Date();
          item.priority = 0.9;
        }
        return item;
      },
    }),
    taiwlind(),
    astroImageTools,
  ],

  vite: {
    plugins: [
      {
        name: "permissions-policy",
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
