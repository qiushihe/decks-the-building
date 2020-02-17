import merge from "webpack-merge";

import FaviconsWebpackPlugin from "favicons-webpack-plugin";

import common from "./webpack.config.common.babel.js";

export default merge(common, {
  mode: "production",
  output: {
    publicPath: "/decks-the-building/"
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: "./src/image/favicon.png",
      mode: "webapp",
      devMode: "webapp",
      outputPath: "favicon",
      publicPath: "/decks-the-building/",
      prefix: "favicon",
      inject: true,
      favicons: {
        appName: "decks-the-building",
        appDescription: "Decks the Building",
        developerName: "Bulizzard Entertakement",
        developerURL: "https://pulayhahstone.com"
      }
    })
  ]
});
