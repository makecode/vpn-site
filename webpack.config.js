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
        filename: 'pricing-2.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/pricing-2/pricing-2.pug'
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
      new HtmlWebpackPlugin({
        filename: 'contact-us.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/contact-us/contact-us.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'help.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/help/help.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'help-billing.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/help-billing/help-billing.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'help-get-started.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/help-get-started/help-get-started.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'terms.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/terms/terms.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'privacy.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/privacy/privacy.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'rights.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/rights/rights.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'uninstall.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/uninstall/uninstall.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'ticket-submit.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/ticket-submit/ticket-submit.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'ticket-success.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/ticket-success/ticket-success.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'payment-success.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/payment-success/payment-success.pug'
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
