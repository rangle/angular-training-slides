var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './main.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  externals: {
    'reveal': 'Reveal'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { test: /\.css$/, loaders: ["style", "css"] },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loaders: ['file'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([ 
      { from: { glob: 'content/*.md' } },
      { from: { glob: 'content/images/*' } }
    ])
  ],
  devServer: {
    noInfo: true,
    port: 8081
  }
};
