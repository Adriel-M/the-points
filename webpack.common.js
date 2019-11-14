const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const clientFolder = path.resolve(__dirname, 'src/client/');
const buildFolder = path.resolve(__dirname, 'build/');

module.exports = {
  entry: [
    'whatwg-fetch',
    path.resolve(__dirname, 'src/client/index.jsx'),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: buildFolder,
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(buildFolder, 'index.html'),
      inject: 'head',
      template: path.resolve(clientFolder, 'public/index.html'),
      hash: false,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new LodashModuleReplacementPlugin(),
  ],
};
