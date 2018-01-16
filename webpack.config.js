const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
module.exports = {
  entry: {
    index: './src/js/index.js',
    cart: './src/js/cart.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/[name].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'}
          ]
        })
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, ''),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'cart.html',
      template: './src/cart.html',
      chunks: ['cart']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new ExtractTextPlugin('css/styles.css')
  ]
  // devtool: '#souerce-map'
}
