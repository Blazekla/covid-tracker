const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.js", "./public/index.html"],
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
