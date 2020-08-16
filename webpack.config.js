const path = require("path"); // Manipulates filepaths
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
var dotenv = require('dotenv').config({path: __dirname + '/.env'});

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
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
        use: [
          "style-loader",
          "css-loader",
        ]
      }
    ],
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
  }),
  ],
  devServer: {
    historyApiFallback: true
  },
};
