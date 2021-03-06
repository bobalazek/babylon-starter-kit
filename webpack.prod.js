const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {

    devtool: 'source-map',

    output: {
        path: path.resolve(__dirname, 'build'),
    },

    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
        }),
    ],

});
