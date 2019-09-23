const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    administration: './js/administration.js',
    specialist: './js/specialist.js',
    index: './js/index.js',
    client: './js/client.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
