import merge from "webpack-merge";

import common from "./webpack.config.common.babel.js";

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    publicPath: "/"
  },
  devServer: {
    writeToDisk: true,
    historyApiFallback: {
      index: "/index.html"
    }
  }
});
