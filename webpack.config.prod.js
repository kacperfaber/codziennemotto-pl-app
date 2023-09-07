const {merge} = require('webpack-merge');
const common = require("./webpack.config.js");
const webpack = require("webpack");
const path = require("path");

const config = {
    apiUrl: "http://localhost:8080" // TODO
}

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            '@routeSecurity': path.resolve(__dirname, "src/ui/routes/routeSecurity.dev.ts")
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.PROFILE": JSON.stringify("prod"),
            "process.env.CONFIG": JSON.stringify(config)
        })
    ]
})