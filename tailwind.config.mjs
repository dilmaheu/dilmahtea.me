import lineClamp from "@tailwindcss/line-clamp";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [lineClamp, typography()],
  content: [`./**/*.{astro,html,jsx,tsx}`],
  theme: {
    extend: {
      colors: {
        primary: "#547B7D", // green
        "primary-light": "#B2CCCC", // green light
        secondary: "#E2DFDE", // beige
        "secondary-light": "#FAF4F2", // beige light
        "black-bg": "#13110B",
        black: "#2F2F2F",
        "black-light": "#474747",
        error: "#E06464",
        "error-light": "#FFE2E2",
        success: "#3C994E",
        "success-light": "#E9F9EF",
        warning: "#FEBF21",
        "warning-light": "#FAF8E5",
        info: "#3087E9",
        "info-light": "#E7EDF9",

        // exceptions
        teal: "#405658",
        slate: "#8B8B8B",
        "pale-rose": "#F0EEEE",
      },

      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#474747",
            "--tw-prose-headings": "2F2F2F",
            "--tw-prose-links": "#547B7D",
            "--tw-prose-bullets": "#474747",
            "--tw-prose-counters": "#474747",
          },
        },
      }),
    },
  },
};
