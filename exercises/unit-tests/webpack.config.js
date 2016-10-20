const webpack = require('webpack');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = 'production';

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin('globals'),
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    __dirname
  ),
];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  })
];

const plugins = basePlugins
  .concat((process.env.NODE_ENV === PRODUCTION) ? prodPlugins: []);

module.exports = {
  entry: {
    globals: [
      'zone.js',
      'reflect-metadata'
    ],
    app: './src/main.ts',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    loaders: [
      loaders.ts,
      loaders.html,
      loaders.css,
      loaders.json,
    ]
  },
  plugins: plugins,
  devServer: {
    noInfo: true,
    historyApiFallback: true
  }  
};
