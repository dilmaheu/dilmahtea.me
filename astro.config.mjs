import solid from "@astrojs/solid-js";
import taiwlind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";

import AstroIcon from "astro-icon";
import AstroFavicons from "astro-favicons";
import AutoImport from "unplugin-auto-import/vite";

import PermissionsPolicy from "./src/store/PermissionsPolicy.js";
import postbuildIntegration from "./src/postbuild-integration/index.js";

// https://astro.build/config
export default defineConfig({
  site: "https://dilmahtea.me",

  vite: {
    ssr: { external: ["svgo"] },
    optimizeDeps: { exclude: ["astro-imagetools"] },
    plugins: [
      AutoImport({
        include: [/\.(astro|ts|js)$/],
        imports: [{ "astro-imagetools/api": ["importImage"] }],
      }),
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

  integrations: [
    solid(),
    taiwlind(),
    astroImageTools,
    postbuildIntegration,
    AstroIcon(),
    AstroFavicons({
      appName: "Dilmahtea.me",
      masterPicture: "./public/favicon.svg",
      emitAssets: true,
      faviconsDarkMode: true,
    }),
  ],
});
