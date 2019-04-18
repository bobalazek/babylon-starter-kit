const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: process.env.CLIENT_PORT || 8080,
    },

});
