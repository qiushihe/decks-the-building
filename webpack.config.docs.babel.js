import { resolve as resolvePath } from "path";
import merge from "webpack-merge";

import common from "./webpack.config.common.babel.js";

export default merge(common, {
  mode: "production",
  output: {
    path: resolvePath(__dirname, "docs"),
    publicPath: "/decks-the-building/"
  }
});
