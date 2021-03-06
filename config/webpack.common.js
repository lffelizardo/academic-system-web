﻿var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
          {
              test: /\.ts$/,
              loaders: [
                {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root('src', 'tsconfig.json') }
                }, 'angular2-template-loader'
              ]
          },
          {
              test: /\.html$/,
              loader: 'html-loader'
          },
          {
              test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
              loader: 'file-loader?name=assets/[name].[hash].[ext]'
          },
            {
                test: /\.less$/,
                include: helpers.root('app'),
                loaders: [
                    'exports-loader?module.exports.toString()',
                    'css-loader', 
                    'less-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: helpers.root('app'),
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('app'),
                loaders: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.css$/,
                include: helpers.root('app'),
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
      // Workaround for angular/angular#11580
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src'), // location of your src
        {} // a map of your routes
      ),

      new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'vendor', 'polyfills']
      }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new CopyWebpackPlugin([{
            from: "./static/**/*",
            to: "./"
        }]),
        new CopyWebpackPlugin([{
            from: "./static/**/*",
            to: "./"
        }]),
        new CopyWebpackPlugin([{
            from: "./conf.d/**/*",
            to: "./"
        }])
    ]
};
