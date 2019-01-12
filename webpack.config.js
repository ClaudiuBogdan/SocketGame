"use strict";
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "game.bundle.js"
  },

  module: {
    rules: [
      {
        test: /\js$/,
        include: path.resolve(__dirname, "src/"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|ogg|mp3|fnt)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "assets")
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, "build")
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "index.html"),
        to: path.resolve(__dirname, "build")
      },
      {
        from: path.resolve(__dirname, "assets", "**", "*"),
        to: path.resolve(__dirname, "build")
      }
    ]),
    new webpack.DefinePlugin({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true)
    })
  ]
};
