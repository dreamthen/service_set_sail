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

const port = 9999;

const production = "dev";

const webpackDevConfig = {
    devtool: "source-map",
    entry: {
        index: `${APP_DIR}/app.js`
    },
    output: {
        publicPath: PUBLIC_DIR,
        filename: "[name]_[hash].js",
        path: BUILD_DIR
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
        new webpack.EnvironmentPlugin({
            NODE_ENV: production
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new ExtractTextPlugin("[name]_[hash].css"),
        new HtmlWebpackPlugin({
            publicPath: PUBLIC_DIR,
            filename: "app.html",
            template: `${ROOT_DIR}/app.html`,
            chunks: ['index'],
            inject: 'body'
        })
    ],
    devServer: {
        host: "0.0.0.0",
        port: port,
        proxy: {}
    }
};

module.exports = webpackDevConfig;