const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const js = require('./webpack/js');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATH = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

const common = merge([
  {
    entry: {
      'index': PATH.source + '/index.js'
    },

    output: {
      path: PATH.build,
      filename: 'js/[name].js'
    },

    resolve: {
      alias: {
        media: path.resolve(__dirname, 'source/media'),
      }
    },

    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/index/index.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'pricing.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/pricing/pricing.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'reset.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/reset/reset.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'change-password.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/change-password/change-password.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'done.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/done/done.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'check-email.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/check-email/check-email.pug'
      }),
      // new CopyWebpackPlugin([{
        // from: './locales/**/*',
        // to: './js/'
      // }]),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  },
  js(),
  pug(),
  images(),
  fonts()
]);

module.exports = function (env) {
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css()
    ]);
  }
  if (env === 'production') {
    return merge([
      common,
      extractCSS(),
      uglifyJS()
    ]);
  }
};