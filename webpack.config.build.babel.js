import merge from "webpack-merge";

import common from "./webpack.config.common.babel.js";

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    publicPath: "/"
  }
});
