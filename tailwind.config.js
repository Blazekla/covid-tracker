const plugin = require("tailwindcss/plugin");
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#282c34",
    }),
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
