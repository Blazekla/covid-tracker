const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#377564",
          main: "#00493a",
          dark: "#002214",
        },
        secondary: {
          light: "#e34d2c",
          main: "#aa1200",
          dark: "#740000",
        },
      },
      maxWidth: {
        viewport: "100vw",
      },
      flex: {
        "no-shrink": "1 0 auto",
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".calculate-100": {
          height: "calc( 100vh - 100px )",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
