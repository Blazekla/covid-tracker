const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#282c34",
    }),
    extend: {
      textColor: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        danger: "#e3342f",
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [ plugin(function ({ addUtilities }) {
    const newUtilities = {
      ".calculate-100": {
        height: "calc( 100vh - 100px )",
      },
    };
    addUtilities(newUtilities);
  }),],
}