const webpack = require("webpack"),
    path = require("path"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const PUBLIC_DIR = "/",
    DLL_DIR = path.resolve(__dirname, "../dll"),
    ROOT_DIR = path.resolve(__dirname, "../..");

const webpackDllConfig = {
    devtool: "source-map",
    entry: {
        vendor: ["react", "react-dom", "react-addons", "react-router", "redux", "redux-thunk", "redux-logger", "redux-saga", "antd", "react-redux", "prop-types", "moment"]
    },
    output: {
        publicPath: PUBLIC_DIR,
        filename: "[name]_[hash].js",
        path: DLL_DIR,
        library: "[name]_[chunkhash]"
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    sourceMap: true,
                    compress: {
                        unused: false,
                        dead_code: false,
                        warnings: true
                    },
                    output: {
                        comments: true
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
