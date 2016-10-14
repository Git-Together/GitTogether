/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import validate from 'webpack-validator';
import webpack from 'webpack'

export default validate({
  module: {
	noParse: ['ws'],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
    exclude: /node_modules/,
    query: { presets: ['es2015', 'react', 'stage-0'] }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [new webpack.IgnorePlugin(/vertx/)],

  externals: [
    'bootstrap',
	  'dotenv',
	  'ws'
  ]
});
