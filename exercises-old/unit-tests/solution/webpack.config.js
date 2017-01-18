const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = 'production';
const TEST = 'test';

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
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

const testExcludedPlugins = [
  new webpack.optimize.CommonsChunkPlugin('globals'),
];

const plugins = basePlugins
  .concat((process.env.NODE_ENV === PRODUCTION) ? prodPlugins: [])
  .concat((process.env.NODE_ENV !== TEST ? testExcludedPlugins : []));

module.exports = {
 // entry: './src/tests.entry.ts',
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
    extensions: ['.js', '.ts', '.webpack.js', '.web.js']
  },
  module: {
    loaders: [
      { test: /.ts$/, loader: 'awesome-typescript-loader' },
      { test: /.json$/, loader: 'json-loader' },
      { test: /.html$/, loader: 'raw' },
      { test: /.css$/, loaders: ['css-to-string', 'css'] }
    ]
  },
  plugins: plugins,
  devServer: {
    noInfo: true,
    historyApiFallback: true
  }  
};
