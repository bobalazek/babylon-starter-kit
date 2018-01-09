const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {

    entry: {
        app: path.resolve(__dirname, 'src', 'main.ts'),
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'sass-loader' ],
                }),
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?limit=1024&name=[name].[ext]',
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: path.resolve('src', 'static', 'index.html'),
        }),
        new WriteFilePlugin(),
        new CopyWebpackPlugin([
            {
                from: 'src/static',
                to: 'static',
                ignore: [
                    'index.html',
                    '**/*.css', // already handled by the ExtractTextPlugin, so no need to copy them over
                ],
            },
        ], {
            copyUnmodified: true,
        }),
    ],

    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },

};
