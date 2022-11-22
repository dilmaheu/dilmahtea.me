import taiwlind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import PermissionsPolicy from "./src/store/PermissionsPolicy.js";

export default defineConfig({
  site: "https://dilmahtea.me",

  integrations: [taiwlind(), astroImageTools],

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
});
