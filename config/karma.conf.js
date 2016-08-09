// http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = config => {
  config.set({
    browsers: [
      // 'IE',
      // 'IE10',
      // 'IE9',
      'PhantomJS'
    ],
    frameworks: ['jasmine'],
    basePath: '../',
    files: [
      './config/spec-bundle.js'
    ],
    exclude: [],
    plugins: [
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-webpack'
    ],
    preprocessors: {
      './config/spec-bundle.js': [
        'webpack'
      ]
    },
    webpack: require('./webpack.test.js'),
    reporters: ['mocha'],
    // values => config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
    // config.LOG_DEBUG
    // logLevel: config.LOG_INFO,
  });
};
