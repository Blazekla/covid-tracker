const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // backgroundColor: (theme) => ({
    //   ...theme("colors"),
    //   // primary: "#282c34",
    // }),
    extend: {
      colors: {
        // amberrose: colors.amber,
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
      textColor: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        danger: "#e3342f",
      },
      maxWidth: {
        viewport: "100vw",
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
