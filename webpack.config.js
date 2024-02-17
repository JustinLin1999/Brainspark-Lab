const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './client/index.html'),
    })
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options:{
            presets: ["@babel/preset-env","@babel/preset-react"],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // MiniCssExtractPlugin.loader
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 8081,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    static: path.join(__dirname, './dist'),
    proxy: [{
      context :'/api',
      target: 'http://localhost:3000',
      secure: false
    }],
  }
};