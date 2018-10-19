const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.js'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.(jpg|png|svg)$/,
      loaders: ['file-loader'],
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
      ],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
  ],
  output: {
    publicPath: '',
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
