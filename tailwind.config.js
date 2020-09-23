module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#282c34",
    }),
  },
  variants: {},
  plugins: [],
};
