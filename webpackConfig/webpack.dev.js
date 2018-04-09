const webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const PUBLIC_DIR = "/",
    DLL_DIR = path.resolve(__dirname, "../dll"),
    APP_DIR = path.resolve(__dirname, "../scripts"),
    ROOT_DIR = path.resolve(__dirname, "../"),
    BUILD_DIR = path.resolve(__dirname, "../build"),
    STYLE_DIR = path.resolve(__dirname, "../stylesheets"),
    MANIFEST_DIR = require(path.resolve(__dirname, `${DLL_DIR}/vendor_manifest.dll.json`));

const port = 9997;

const webpackDevConfig = {
    mode: "development",
    devtool: "source-map",
    entry: {
        index: `${APP_DIR}/index.js`
    },
    output: {
        publicPath: PUBLIC_DIR,
        filename: "[name]_[hash].js",
        path: BUILD_DIR
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
    resolve: {
        modules: [
            "node_modules",
            APP_DIR,
            DLL_DIR
        ]
    },
    externals: {
        jquery: "jQuery"
    },
    module: {
        rules: [{
            test: /.js[x]?$/,
            include: [
                APP_DIR,
                DLL_DIR,
                STYLE_DIR
            ],
            use: [{loader: "babel-loader"}]
        }, {
            test: /.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{loader: "css-loader", options: {importLoaders: 1}}, {loader: "postcss-loader"}],
                publicPath: STYLE_DIR
            })
        }, {
            test: /.(png|jpg|jpeg|bmp|gif)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            }, {loader: "image-webpack-loader"}]
        }]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DllReferencePlugin({
            manifest: MANIFEST_DIR,
            context: ROOT_DIR
        }),
        new ExtractTextPlugin("[name]_[hash].css"),
        new HtmlWebpackPlugin({
            publicPath: PUBLIC_DIR,
            filename: "index.html",
            template: `${ROOT_DIR}/index.html`,
            chunks: ['index'],
            inject: 'body'
        })
    ],
    devServer: {
        host: "0.0.0.0",
        port: port,
        proxy: {
            "/keryi/": {
                target: "http://116.62.65.162:7001/",
                secure: true,
                pathRewrite: {"/keryi/": ""}
            }
        },
        historyApiFallback: true
    }
};

module.exports = webpackDevConfig;