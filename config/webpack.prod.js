const helpers = require('./helpers');
const rimraf = require('rimraf');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_FOR_GITHUB_PAGE = helpers.hasProcessFlag('-my-ghp');
const BASE_URL = IS_FOR_GITHUB_PAGE ? '/narr/' : '/';
const ROOT_PATH = helpers.root('src');
const INDEX_SCSS_PATH = helpers.root('src/index.scss');
const ENTRY_ORDER = ['polyfills', 'vendor', 'main'];
const OUTPUT_PATH = IS_FOR_GITHUB_PAGE ? helpers.root('gh-pages') : helpers.root('dist');
const INDEX_PATH = helpers.root('src/index.html');
const ICON_PATH = /icon/;
const IS_DEV_MODE = helpers.hasProcessFlag('-my-dev');

rimraf.sync(OUTPUT_PATH);

module.exports = {
  metadata: {
    github: IS_FOR_GITHUB_PAGE
    // baseUrl: BASE_URL
  },
  devtool: 'source-map',
  context: ROOT_PATH,
  entry: {
    polyfills: [
      './polyfills.ts'
    ],
    vendor: [
      './vendor.ts'
    ],
    main: [
      INDEX_SCSS_PATH,
      './app/main.ts'
    ]
  },
  output: {
    publicPath: BASE_URL,
    path: OUTPUT_PATH,
    filename: 'js/[name].bundle.js?[chunkhash]',
    chunkFilename: 'js/[name].chunk.js?[chunkhash]'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: ROOT_PATH
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
        include: [
          INDEX_SCSS_PATH
        ],
        // to disable removing vendor prefixes, add '-autoprefixer' option
        loader: ExtractTextPlugin.extract(['css?sourceMap&-autoprefixer', 'postcss', 'resolve-url',
          'sass?sourceMap'])
      },
      {
        test: /\.scss$/,
        exclude: [
          INDEX_SCSS_PATH
        ],
        loaders: ['css?-autoprefixer', 'postcss', 'sass']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [
          ICON_PATH
        ],
        loaders: [
          'file?name=asset/img/ic/[name].[ext]?[hash]'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
          ICON_PATH,
          /node_modules\/font-awesome/
        ],
        loaders: [
          'file?name=asset/img/[name].[ext]?[hash]'
        ]
      },
      {
        test: /\.(otf|woff|woff2|ttf|eot|svg)(\?.*?)?$/i,
        loaders: [
          'file?name=asset/font/[name].[ext]?[hash]'
        ]
      },
      {
        test: /\.html$/,
        exclude: [INDEX_PATH],
        loaders: ['raw']
      },
      {
        test: /\.ts$/,
        loaders: ['ts']
      }
    ]
  },
  postcss: () => [autoprefixer({ browsers: 'last 3 versions' })],
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    }),
    new ExtractTextPlugin('css/[name].bundle.css?[contenthash]'),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: helpers.reverse(ENTRY_ORDER),
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // https://github.com/kangax/html-minifier#options-quick-reference
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true
      },
      template: INDEX_PATH,
      chunksSortMode: helpers.packageSort(ENTRY_ORDER)
    }),

    // https://github.com/webpack/docs/wiki/optimization#deduplication
    new webpack.optimize.DedupePlugin(),

    IS_DEV_MODE ? f => f :
      // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // https://github.com/mishoo/UglifyJS2
      new webpack.optimize.UglifyJsPlugin({
        // mangle: false,
        // beautify: true,
        // comments: false
        compress: {
          drop_console: true
        }
      }),

    function done() {
      this.plugin('done', stats => {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          // console.log(stats.compilation.errors);
          console.log(stats.compilation.errors[0]);
          process.exit(1);
        }
      });
    }
  ]
};
