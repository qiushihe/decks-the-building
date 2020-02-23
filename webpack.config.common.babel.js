import { resolve as resolvePath } from "path";

import { DefinePlugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackTagsPlugin from "html-webpack-tags-plugin";

export default {
  entry: {
    bundle: "./src/index.jsx"
  },
  output: {
    filename: "[name].js",
    path: resolvePath(__dirname, "build")
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),

    new DefinePlugin({
      "process.env.SCRYFALL_API_ORIGIN": JSON.stringify(process.env.SCRYFALL_API_ORIGIN)
    }),

    new CopyWebpackPlugin([{
      from: "./node_modules/@saeris/typeface-beleren-bold",
      to: "asset/font/typeface-beleren-bold"
    }]),

    new HtmlWebpackPlugin({
      excludeChunks: [],
      template: "./src/template/index.html",
      filename: "index.html",
      favicon: "./src/asset/image/favicon.png",
      hash: true,
      xhtml: true
    }),

    new HtmlWebpackTagsPlugin({
      links: "asset/font/typeface-beleren-bold/index.css",
      append: true
    })
  ]
};
