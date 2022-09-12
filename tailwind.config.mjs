import lineClamp from "@tailwindcss/line-clamp";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [lineClamp, typography()],
  content: [`./**/*.{astro,html}`],
  theme: {
    extend: {
      colors: {
        dark: "#474747",
        primary: "#2b4b50",
        lightgray: "#e3dfde"
      },

      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-headings": "#2b4b50",
            "--tw-prose-links": "#2b4b50",
            "--tw-prose-bullets": "#2b4b50",
          },
        },
      }),
    },
  },
};
