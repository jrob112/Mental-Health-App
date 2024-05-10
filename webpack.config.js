const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client/src/index.html'),
  output: {
    file: path.resolve(__dirname, 'client/dist'),

  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'index.js',
  },
  // devTool: 'eval',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './client/src/index.html' })
  ],
};
