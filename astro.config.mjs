import { defineConfig } from "astro/config";
import permissionsPolicy from "./src/store/permissionsPolicy.js";

export default defineConfig({
  site: "https://dilmahtea.me",
  vite: {
    plugins: [
      {
        name: "add-permissions-policy-header",
        configureServer: (server) => {
          server.middlewares.use((_req, res, next) => {
            res.setHeader(
              "Permissions-Policy",
              permissionsPolicy
            );
            next();
          });
        },
      },
    ],
  },
});
