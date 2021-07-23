module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {},
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
};
