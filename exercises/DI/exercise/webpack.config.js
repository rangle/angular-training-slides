const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PRODUCTION = "production";

const postcss = () => ([
  require("postcss-import")({
    addDependencyTo: webpack,
  }),
  require("postcss-cssnext"),
]);

const basePlugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin("vendor"),
  new HtmlWebpackPlugin({
    template: "./index.html"
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
    mangle: {
      keep_fnames: true,
    },
    compress: {
      warnings: false,
    },
  })
];

const plugins = basePlugins
  .concat((process.env.NODE_ENV === PRODUCTION) ? prodPlugins: []);

module.exports = {
  entry: {
    app: "./main.ts",
    vendor: [
      '@angular/core',
      '@angular/compiler',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      'core-js',
      "zone.js",
      "reflect-metadata"
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      { test: /.ts$/, loader: "awesome-typescript-loader" },
      { test: /.json$/, loader: "json-loader" },
      { test: /.html$/, loader: "raw" },
      { test: /.css$/, loader: "to-string!css?-minimize!postcss", exclude: /node_modules/ }
    ]
  },
  plugins: plugins,
  devServer: {
    noInfo: true,
    historyApiFallback: true
  }
};
