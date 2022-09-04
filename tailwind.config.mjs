import lineClamp from "@tailwindcss/line-clamp";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [lineClamp, typography()],
  content: [`./**/*.{astro,html}`],
  theme: {
    extend: {
      colors: {
        primary: "#2b4b50",
      },

      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-headings": "#2b4b50",
            "--tw-prose-bullets": "#2b4b50",
          },
        },
      }),
    },
  },
};
