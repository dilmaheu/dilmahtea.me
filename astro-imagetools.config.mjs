import { defineConfig } from "astro-imagetools/config";

export default defineConfig({
  fallbackFormat: "webp",
  includeSourceFormat: false,
  placeholder: "dominantColor",
  fit: "cover",
  position: "attention",
  fadeInTransition: false,
});
