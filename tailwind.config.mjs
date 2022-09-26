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
        dark2: "#2f2f2f",
        primary: "#2b4b50",
        lightgray: "#e3dfde",
        lightgray2: "#faf4f2",
        white1: "#f0eeee",
        white2: "#faf4f2",
      },

      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#474747",
            "--tw-prose-headings": "#474747",
            "--tw-prose-links": "#474747",
            "--tw-prose-bullets": "#474747",
            "--tw-prose-counters": "#474747",
          },
        },
      }),
    },
  },
};
