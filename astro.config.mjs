import { defineConfig } from "astro/config";
import PermissionsPolicy from "./src/store/PermissionsPolicy.js";

export default defineConfig({
  site: "https://dilmahtea.me",
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
