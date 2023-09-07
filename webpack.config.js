const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, './www/generated/compile-js/'),
        filename: "app-bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/bootstrap-dark-5/dist/css/bootstrap-night.css',
                    to: path.resolve(__dirname, 'www/generated/css/bootstrap-night.css')
                },

                {
                    from: 'third-party-licenses.txt',
                    to: path.resolve(__dirname, 'www/generated/third-party-licenses.txt')
                }
            ]
        })
    ]
};