const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = 'production';

const postcss = () => ([
  require('postcss-import')({
    addDependencyTo: webpack,
  }),
  require('postcss-cssnext'),
]);

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
  new webpack.LoaderOptionsPlugin({
    test: /\.css$/,
    options: { postcss },
  }),
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
    app: './src/boot.ts',
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
      { test: /.ts$/, loader: 'awesome-typescript-loader' },
      { test: /.json$/, loader: 'json-loader' },
      { test: /.html$/, loader: 'raw' },
      { test: /.css$/, loader: 'to-string!css?-minimize!postcss', exclude: /node_modules/ }
    ]
  },
  plugins: plugins,
  devServer: {
    noInfo: true,
    historyApiFallback: true
  }  
};
