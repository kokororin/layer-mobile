const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    layer: ['./src/layer'],
    'layer.min': ['./src/layer']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'layer',
    libraryTarget: 'umd'
  },
  resolve: { extensions: ['.js'] },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  stats: 'detailed',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false,
        drop_console: true
      },
      beautify: false,
      comments: false
    })
  ]
};
