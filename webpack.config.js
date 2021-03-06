
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var config = [
    {
        entry: {
            app: [
                __dirname + '/src/app/index.ts'
            ],
            bot: [
                __dirname + '/src/bot/index.ts'
            ],
            tab: [
                __dirname + '/src/tab/index.ts'
            ],
            custombot: [
                __dirname +'/src/custombot/index.ts'
            ]
        },
        output: {
            path: __dirname + '/generators/',
            filename: '[name]/index.js',
            libraryTarget: 'commonjs-module'
        },
        externals: nodeModules,
        devtool: 'none',
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
            }
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    exclude: [/lib/, /dist/, /templates/],
                    loader: "ts-loader"
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: 'src/app/templates',
                to: 'app/templates'
            }]),
            new CopyWebpackPlugin([{
                from: 'src/tab/templates',
                to: 'tab/templates'
            }]),
            new CopyWebpackPlugin([{
                from: 'src/bot/templates',
                to: 'bot/templates'
            }]),
            new CopyWebpackPlugin([{
                from: 'src/custombot/templates',
                to: 'custombot/templates'
            }])
        ]
    }
];


module.exports = config;