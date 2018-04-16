const webpack = require("webpack"),
    path = require("path"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const PUBLIC_DIR = "/",
    DLL_DIR = path.resolve(__dirname, "../dll"),
    ROOT_DIR = path.resolve(__dirname, "../..");

const webpackDllConfig = {
    mode: "development",
    devtool: "source-map",
    entry: {
        vendor: ["react", "react-dom", "react-addons", "react-router", "redux", "redux-thunk", "redux-logger", "redux-saga", "redux-devtools", "antd", "react-redux", "prop-types", "moment", "axios"]
    },
    output: {
        publicPath: PUBLIC_DIR,
        filename: "[name]_bundle.js",
        path: DLL_DIR,
        library: "[name]_[chunkhash]"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        unused: false,
                        dead_code: false,
                        warnings: true
                    },
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DllPlugin({
            path: path.join(DLL_DIR, "[name]_manifest.dll.json"),
            name: "[name]_[chunkhash]",
            context: ROOT_DIR
        })
    ]
};
module.exports = webpackDllConfig;
