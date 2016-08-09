const helpers = require('./helpers');
const rimraf = require('rimraf');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map', // to show the src line number on Unit test error
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src')
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loaders: ['tslint']
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['null']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['null']
      },
      {
        test: /\.html$/,
        loaders: ['null']
      },
      {
        test: /\.ts$/,
        loaders: ['ts']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('unit-test')
    })
  ]
};
