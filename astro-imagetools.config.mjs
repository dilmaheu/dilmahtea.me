import { defineConfig } from "astro-imagetools/config";

export default defineConfig({
  fit: "cover",
  position: "attention",
  fallbackFormat: "webp",
  fadeInTransition: false,
  includeSourceFormat: false,
  placeholder: "dominantColor",
  assetFileNames: "_astro/[name]-[width][extname]",
});
