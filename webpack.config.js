const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname, 'src') + '/index.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      util: require.resolve("util/"),
      fs: require.resolve("fs")
    }
  },
  module: {
    rules: [
      {test: /\.ts/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new NodePolyfillPlugin()
  ]
}
