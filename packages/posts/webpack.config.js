const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './dev-mode',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false
  },

  output: {
    publicPath: 'http://localhost:3002/',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      { 
        test: /\.scss$/, 
        type: 'asset/source',
        use: ['sass-loader']
      },
      { 
        resourceQuery: /raw/, 
        type: 'asset/source'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'posts',
      library: { type: 'var', name: 'posts' },
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/index',
      },
      shared: {
        '@angular/core': { singleton: true }, 
        '@angular/common': { singleton: true }, 
        '@angular/platform-browser-dynamic': { singleton: true }, 
        '@angular/platform-browser': { singleton: true }, 
        'single-spa-angular': { singleton: true },
        'zone.js': { singleton: true },
        'core-js/features/reflect': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ],
}
