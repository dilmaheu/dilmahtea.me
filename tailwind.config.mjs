import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [typography()],
  content: [`./**/*.{astro,html,jsx,tsx}`],
  theme: {
    extend: {
      colors: {
        primary: "#1E4848",
        "primary-light": "#2E595C",
        "primary-lighter": "#547B7D",
        "primary-lightest": "#B2CCCC",
        secondary: "#E3DFDE",
        "secondary-light": "#FAF4F2",
        white: "#FFFFFF",
        black: "#000000",
        "black-light": "#474747",
        "black-lighter": "#595959",
        info: "#3087E9",
        "info-light": "#E7EDF9",
        success: "#3C994E",
        "success-light": "#E9F9EF",
        warning: "#FEBF21",
        "warning-light": "#FAF8E5",
        error: "#E06464",
        "error-light": "#FFE2E2",
        "error-dark": "#AB0504",

        // exceptions
        teal: "#405658",
        slate: "#8B8B8B",
        "pale-rose": "#F0EEEE",
        "dark-green": "#2A5A5A",
      },

      fontSize: {
        "heading-big": ["clamp(64px,calc(-2vw + 76.8px),48px)", "110%"],
        h1: ["clamp(32px,calc(2vw + 19.2px),48px)", "110%"],
        h2: ["clamp(28px,calc(1.75vw + 16.8px),42px)", "140%"],
        h3: ["clamp(24px,calc(1vw + 17.6px),32px)", "140%"],
        h4: ["clamp(24px,calc(0.5vw + 20.8px),28px)", "150%"],
        h5: ["clamp(20px,calc(0.5vw + 16.8px),24px)", "150%"],
        "h5-sm": ["clamp(14px,calc(1.25vw + 6px),24px)", "110%"],
        h6: ["clamp(18px,calc(0.25vw + 16.4px),20px)", "150%"],

        b1: ["clamp(24px,calc(1vw + 17.6px),32px)", "150%"],
        b2: ["clamp(20px,calc(1vw + 13.6px),28px)", "150%"],
        b3: ["clamp(18px,calc(0.75vw + 13.2px),24px)", "150%"],
        b4: ["clamp(16px,calc(0.5vw + 12.8px),20px)", "150%"],
        b5: ["clamp(16px,calc(0.25vw + 14.4px),18px)", "150%"],
        "b5-sm": ["clamp(14px,calc(0.5vw + 10.8px),18px)", "150%"],
        b6: ["clamp(14px,calc(0.25vw + 12.4px),16px)", "150%"],
        "b6-sm": ["clamp(12px,calc(0.5vw + 8.8px),16px)", "150%"],
        "b6-xs": ["clamp(10px,calc(0.75vw + 5.2px),16px)", "150%"],
        b7: ["clamp(12px,calc(0.25vw + 10.4px),14px)", "150%"],
        b8: ["clamp(10px,calc(0.25vw + 8.4px),12px)", "150%"],
      },

      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#474747",
            "--tw-prose-headings": "#000000",
            "--tw-prose-links": "#1E4848",
            "--tw-prose-bullets": "#474747",
            "--tw-prose-counters": "#474747",
          },
        },
      }),
    },
  },
};
