process.env.TEST = true;

const webpack = require('./webpack.config');

module.exports = (config) => {
  config.set({
    frameworks: [
      'jasmine',
    ],

    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-spec-reporter',
      'karma-phantomjs-launcher',
    ],

    files: [
      './src/tests.entry.ts',
      {
        pattern: '**/*.map',
        served: true,
        included: false,
        watched: true,
      },
    ],

    preprocessors: {
      './src/tests.entry.ts': [
        'webpack',
      ],
    },

    webpack: webpack,

    webpackServer: {
      noInfo: true, // prevent console spamming when running in Karma!
    },

    reporters: ['spec'],

    port: 9999,
    browsers: ['PhantomJS'], 
    colors: true,
    // logLevel: config.LOG_DEBUG,
    autoWatch: true,
    captureTimeout: 6000,
  });
};
