const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const webpack = require('webpack')

const src = resolve(__dirname, 'src')
const dist = resolve(__dirname, 'dist')

module.exports = {
  context: src,

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: '/'
  },

  devtool: 'cheap-eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: '../index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    overlay: true,
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '../index.html' }]
    }
  }
}