const webpack = require("webpack");
const path = require("path");

module.exports = {
  context: __dirname + "/client",
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
    // loaders: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: 'babel-loader',
    //     query: {
    //       presets: ['react', 'es2015', 'env']
    //     },
    //   },
    // ],
  },
  output: {
    path: __dirname + "/public",
    filename: "app.js"
  }
};
