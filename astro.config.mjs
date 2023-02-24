import taiwlind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import PermissionsPolicy from "./src/store/PermissionsPolicy.js";
import postbuildIntegration from "./src/postbuild-integration/index.js";
import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://dilmahtea.me",

  vite: {
    ssr: {
      external: ["svgo"],
    },
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

  integrations: [solid(), taiwlind(), astroImageTools, postbuildIntegration],
});
