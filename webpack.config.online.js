const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const entries = {
    'christina': './src/index.js',
    'christina.min': './src/index.js'
};

module.exports = {
    'entry': entries,
    'output': {
        'filename': '[name].js',
        'path': path.join(__dirname, 'dist/'),
        'library': 'Chris',
        'libraryTarget': 'umd'
    },
    'module': {
        'rules': [
            {
                'test': /\.js[x]?$/,
                'exclude': /node_modules/,
                'use': {
                    'loader': 'babel-loader',
                    'options': {
                        'presets': ['babel-preset-env','stage-0'],
                        'plugins': ['transform-runtime']
                    }
                }
            }

        ]
    },
    'node': {
        'console': false,
        'fs': 'empty',
        'net': 'empty',
        'tls': 'empty'
    },
    'externals': [
        'child_process',
        'aws-sdk'
    ],
    'plugins': [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('pro')
        }),
        new UglifyJSPlugin({
            include : /\.min\.js$/
        })
    ]
};
