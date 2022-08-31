import tailwindTypography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [tailwindTypography()],
  content: [`./**/*.{astro,html}`],
  theme: {
    extend: {
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
