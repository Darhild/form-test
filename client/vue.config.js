const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
  // eslint-disable-next-line no-unused-vars
  chainWebpack: config => {
    // eslint-disable-next-line no-unused-labels
    plugins: [
      new GoogleFontsPlugin({
        fonts: [{ family: "Roboto" }]
      })
    ];
  }
};
