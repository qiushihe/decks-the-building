import { resolve as resolvePath } from "path";

import { DefinePlugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

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
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        exclude: /beleren-bold/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            limit: 8000, // Convert images < 8kb to base64 strings
            outputPath: "asset/image/"
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "asset/font/"
            }
          }
        ]
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

    new HtmlWebpackPlugin({
      excludeChunks: [],
      template: "./src/template/index.html",
      filename: "index.html",
      favicon: "./src/asset/image/favicon.png",
      hash: true,
      xhtml: true
    })
  ]
};
