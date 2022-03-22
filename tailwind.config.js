
const brandColours = {
  "brand": "#0D9488",
  "brand-accent": "#0F766E",
  "brand-background": {
    "primary": "#272b34",
    "secondary": "#20242b",
    "tertiary": "#1a1e24"
  },
  "brand-interface": {
    "primary": "#4B5563",
    "secondary": "#374151"
  },
  "brand-text": {
    "primary": "#ccc",
    "secondary": "#eee",
  },
  "brand-red": "#DC2626",
  "brand-orange": "#F97316",
  "brand-yellow": "#FBBF24",
  "brand-green": "#16A34A",
};


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      maxWidth: {
        half: "49%"
      },
      colors: {
        ...brandColours
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': brandColours["brand-text"].primary,
            '--tw-prose-headings': brandColours["brand-text"].secondary,
            '--tw-prose-lead': brandColours["brand-text"].secondary,
            '--tw-prose-links': brandColours["brand-text"].secondary,
            '--tw-prose-bold': brandColours["brand-text"].secondary,
            '--tw-prose-counters': brandColours.brand,
            '--tw-prose-bullets': brandColours.brand,
            '--tw-prose-hr': brandColours["brand-text"].secondary,
            '--tw-prose-quotes': brandColours["brand-text"].primary,
            '--tw-prose-quote-borders': brandColours.brand,
            '--tw-prose-captions': brandColours["brand-text"].primary,
            '--tw-prose-code': brandColours["brand-text"].secondary,
            '--tw-prose-pre-code': brandColours["brand-text"].secondary,
            '--tw-prose-pre-bg': brandColours["brand-background"].tertiary,
            '--tw-prose-th-borders': brandColours["brand-text"].secondary,
            '--tw-prose-td-borders': brandColours["brand-text"].secondary,
          }
        }
      })
    }
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")
  ],
};
