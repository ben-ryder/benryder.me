import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import defaultTheme from "tailwindcss/defaultTheme";


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,astro}",
  ],
  theme: {
    colors: {
      // Tailwind Special
      transparent: 'transparent',
      current: 'currentColor',
      // Theme
      background: {
        f2: 'var(--j-c-background-f2)',
        f1: 'var(--j-c-background-f1)',
        DEFAULT: 'var(--j-c-background)',
        b1: 'var(--j-c-background-b1)',
        b2: 'var(--j-c-background-b2)',
      },
      primary: {
        DEFAULT: 'var(--j-c-primary)',
        interaction: 'var(--j-c-primary-interaction)',
        text: 'var(--j-c-primary-text)',
        textInteraction: 'var(--j-c-primary-text-interaction)',
      },
      secondary: {
        DEFAULT: 'var(--j-c-secondary)',
        interaction: 'var(--j-c-secondary-interaction)',
        text: 'var(--j-c-secondary-text)',
        textInteraction: 'var(--j-c-secondary-text-interaction)',
      },
      disabled: {
        DEFAULT: 'var(--j-c-mono-300)',
        text: 'var(--j-c-mono-600)',
      },
      tertiary: {
        DEFAULT: 'var(--j-c-mono-50)',
      },
      text: {
        DEFAULT: 'var(--j-c-mono-200)',
        emphasis: 'var(--j-c-mono-100)',
        heading: 'var(--j-c-mono-100)',
      },
      destructive: {
        DEFAULT: 'var(--j-c-destructive)',
        interaction: 'var(--j-c-destructive-interaction)',
        text: 'var(--j-c-destructive-text)',
        textInteraction: 'var(--j-c-destructive-text-interaction)',
      },
      info: 'var(--j-c-destructive)',
      warning: 'var(--j-c-warning)',
      danger: 'var(--j-c-danger)',
      error: 'var(--j-c-error)',
      success: 'var(--j-c-success)',
      // All colours
      teal: {
        200: "var(--j-c-teal-200)",
        300: "var(--j-c-teal-300)",
        400: "var(--j-c-teal-400)",
        500: "var(--j-c-teal-500)",
        600: "var(--j-c-teal-600)",
        700: "var(--j-c-teal-700)"
      },
      navy: {
        50: "var(--j-c-navy-50)",
        100: "var(--j-c-navy-100)",
        200: "var(--j-c-navy-200)",
        300: "var(--j-c-navy-300)",
        400: "var(--j-c-navy-400)",
        500: "var(--j-c-navy-500)",
        600: "var(--j-c-navy-600)",
        700: "var(--j-c-navy-700)",
        800: "var(--j-c-navy-800)",
        900: "var(--j-c-navy-900)",
      },
      blueGrey: {
        50: "var(--j-c-blueGrey-50)",
        100: "var(--j-c-blueGrey-100)",
        200: "var(--j-c-blueGrey-200)",
        300: "var(--j-c-blueGrey-300)",
        400: "var(--j-c-blueGrey-400)",
        500: "var(--j-c-blueGrey-500)",
        600: "var(--j-c-blueGrey-600)",
        700: "var(--j-c-blueGrey-700)",
        800: "var(--j-c-blueGrey-800)",
        900: "var(--j-c-blueGrey-900)",
      },
      mono: {
        50: "var(--j-c-mono-50)",
        100: "var(--j-c-mono-100)",
        200: "var(--j-c-mono-200)",
        300: "var(--j-c-mono-300)",
        400: "var(--j-c-mono-400)",
        500: "var(--j-c-mono-500)",
        600: "var(--j-c-mono-600)",
        700: "var(--j-c-mono-700)",
        800: "var(--j-c-mono-800)",
        900: "var(--j-c-mono-900)",
      },
      red: {
        200: "var(--j-c-red-200)",
        300: "var(--j-c-red-300)",
        400: "var(--j-c-red-400)",
        500: "var(--j-c-red-500)",
        600: "var(--j-c-red-600)",
        700: "var(--j-c-red-700)",
      },
      green: {
        200: "var(--j-c-green-200)",
        300: "var(--j-c-green-300)",
        400: "var(--j-c-green-400)",
        500: "var(--j-c-green-500)",
        600: "var(--j-c-green-600)",
        700: "var(--j-c-green-700)",
      },
      orange: {
        200: "var(--j-c-orange-200)",
        300: "var(--j-c-orange-300)",
        400: "var(--j-c-orange-400)",
        500: "var(--j-c-orange-500)",
        600: "var(--j-c-orange-600)",
        700: "var(--j-c-orange-700)",
      },
      yellow: {
        200: "var(--j-c-yellow-200)",
        300: "var(--j-c-yellow-300)",
        400: "var(--j-c-yellow-400)",
        500: "var(--j-c-yellow-500)",
        600: "var(--j-c-yellow-600)",
        700: "var(--j-c-yellow-700)",
      },
      blue: {
        200: "var(--j-c-blue-200)",
        300: "var(--j-c-blue-300)",
        400: "var(--j-c-blue-400)",
        500: "var(--j-c-blue-500)",
        600: "var(--j-c-blue-600)",
        700: "var(--j-c-blue-700)",
      },
      purple: {
        200: "var(--j-c-purple-200)",
        300: "var(--j-c-purple-300)",
        400: "var(--j-c-purple-400)",
        500: "var(--j-c-purple-500)",
        600: "var(--j-c-purple-600)",
        700: "var(--j-c-purple-700)",
      },
      pink: {
        200: "var(--j-c-pink-200)",
        300: "var(--j-c-pink-300)",
        400: "var(--j-c-pink-400)",
        500: "var(--j-c-pink-500)",
        600: "var(--j-c-pink-600)",
        700: "var(--j-c-purple-700)",
      }
    },
    screens: {
      // todo: can a css nesting spec be used here to allow CSS variable usage?
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      // sm: 'var(--j-breakpoint-sm)',
      // md: 'var(--j-breakpoint-md)',
      // lg: 'var(--j-breakpoint-lg)',
      // xl: 'var(--j-breakpoint-xl)'
    },
    spacing: {
      1: 'var(--j-space-1)',
      2: 'var(--j-space-2)',
      3: 'var(--j-space-3)',
      4: 'var(--j-space-4)',
      5: 'var(--j-space-5)',
      6: 'var(--j-space-6)',
      7: 'var(--j-space-7)',
      8: 'var(--j-space-8)',
      12: 'var(--j-space-12)',
      14: 'var(--j-space-14)',
      16: 'var(--j-space-16)',
      18: 'var(--j-space-18)',
      24: 'var(--j-space-24)',
      32: 'var(--j-space-32)',
      48: 'var(--j-space-48)',
      64: 'var(--j-space-64)',
    },
    borderRadius: {
      sm: 'var(--j-border-radius-sm)',
      md: 'var(--j-border-radius-md)',
      lg: 'var(--j-border-radius-lg)',
      xl: 'var(--j-border-radius-xl)',
    },
    borderWidth: {
      sm: 'var(--j-border-width-sm)',
      md: 'var(--j-border-width-md)',
      lg: 'var(--j-border-width-lg)',
      xl: 'var(--j-border-width-xl)',
    },
    boxShadow: {
      sm: 'var(--j-shadow-sm)',
      md: 'var(--j-shadow-md)',
      lg: 'var(--j-shadow-lg)',
      xl: 'var(--j-shadow-xl)',
    },
    zIndex: {
      1: 'var(--j-layer-1)',
      2: 'var(--j-layer-2)',
      3: 'var(--j-layer-3)',
      4: 'var(--j-layer-4)',
      5: 'var(--j-layer-5)',
    },
    fontFamily: {
      sans: defaultTheme.fontFamily.sans,
      serif: defaultTheme.fontFamily.serif,
      mono: ['DepartureMono', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'auto',
            '--tw-prose-body': 'var(--j-c-text)',
            '--tw-prose-headings': 'var(--j-c-text-emphasis)',
            '--tw-prose-lead': 'var(--j-c-text-emphasis)',
            '--tw-prose-links': 'var(--j-c-text-emphasis)',
            '--tw-prose-bold': 'var(--j-c-text-emphasis)',
            '--tw-prose-counters': 'var(--j-c-teal-300)',
            '--tw-prose-bullets': 'var(--j-c-teal-300)',
            '--tw-prose-quotes': 'var(--j-c-text-emphasis)',
            '--tw-prose-quote-borders': 'var(--j-c-teal-500)',
            '--tw-prose-captions': 'var(--j-c-text-emphasis)',
            '--tw-prose-code': 'var(--j-c-text-emphasis)',
            '--tw-prose-pre-code': 'var(--j-c-text)',
            a: {
              '&:hover': {
                color: 'var(--j-c-teal-300)',
              }
            },
            hr: {
              borderWidth: 'var(--j-border-width-lg)',
              borderColor: 'var(--j-c-blueGrey-900)',
              borderRadius: 'var(--j-border-radius-md)',
            },
            pre: {
              backgroundColor: 'var(--j-c-background-b1) !important',
              borderRadius: 'var(--j-border-radius-md)',
            },
            blockquote: {
              backgroundColor: 'var(--j-c-background-f1)',
              borderTopRightRadius: 'var(--j-border-radius-md)',
              borderBottomRightRadius: 'var(--j-border-radius-md)',
              padding: 'var(--j-space-8)',
              p: {
                margin: 'unset'
              }
            },
            figure: {
              img: {
                width: '100%',
                borderTopRightRadius: 'var(--j-border-radius-md)',
                borderTopLeftRadius: 'var(--j-border-radius-md)',
              }
            },
            figcaption: {
              backgroundColor: 'var(--j-c-background-f1)',
              marginTop: 0,
              padding: 'var(--j-space-6)',
              borderTop: 'var(--j-border-width-lg) solid var(--j-c-primary)',
              borderBottomRightRadius: 'var(--j-border-radius-md)',
              borderBottomLeftRadius: 'var(--j-border-radius-md)',
            },
            table: {
              backgroundColor: 'var(--j-c-background-f1)',
              borderRadius: 'var(--j-border-radius-md)',
              thead: {
                borderBottomColor: 'var(--j-c-primary)',
                borderBottomWidth: 'var(--j-border-width-lg)',
                th: {
                  padding: 'var(--j-space-6)',
                }
              },
              tbody: {
                tr: {
                  borderBottomColor: 'var(--j-c-blueGrey-700)',
                },
                td: {
                  padding: 'var(--j-space-6)',
                }
              }
            }
          }
        }
      }
    },
  },
  plugins: [
    typography
  ],
} satisfies Config
