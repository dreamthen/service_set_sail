const webpack = require("webpack"),
    path = require("path"),
    fs = require("fs-extra"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const PUBLIC_DIR = "/",
    ROOT_DIR = path.resolve(__dirname, "../"),
    APP_DIR = path.resolve(__dirname, "../scripts"),
    BUILD_DIR = path.resolve(__dirname, "../build"),
    DLL_DIR = path.resolve(__dirname, "../dll"),
    STYLESHEET_DIR = path.resolve(__dirname, "../stylesheets"),
    IMAGE_DIR = path.resolve(__dirname, "../images"),
    MANIFEST_DIR = require(path.resolve(__dirname, DLL_DIR + "/vendor_manifest.dll.json"));

fs.copySync(DLL_DIR, `${BUILD_DIR}/dll`, {
    dereference: true
});

fs.copySync(STYLESHEET_DIR, `${BUILD_DIR}/css`, {
    dereference: true
});

fs.copySync(IMAGE_DIR, `${BUILD_DIR}/images`, {
    dereference: true
});

const webpackProdConfig = {
    devtool: "cheap-module-source-map",
    mode: "production",
    entry: {
        index: `${APP_DIR}/index.js`,
        background: `${APP_DIR}/background.js`
    },
    output: {
        publicPath: PUBLIC_DIR,
        filename: "js/[name].[hash].js",
        path: `${BUILD_DIR}`
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
                        comments: false
                    }
                }
            })
        ],
        splitChunks: {
            chunks: "all",
            minChunks: 1,
            minSize: 20000,
            name: true
        }
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
                DLL_DIR,
                APP_DIR,
                STYLESHEET_DIR
            ],
            use: ["babel-loader"]
        }, {
            test: /.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        importLoaders: 1
                    }
                }, {
                    loader: "postcss-loader"
                }],
                publicPath: STYLESHEET_DIR
            })
        }, {
            test: /.(png|jpg|jpeg|gif|bmp)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "images/[name].[hash:8].[ext]"
                }
            }, {
                loader: "image-webpack-loader"
            }]
        }]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DllReferencePlugin({
            manifest: MANIFEST_DIR,
            context: ROOT_DIR
        }),
        new ExtractTextPlugin("css/[name].[hash].css"),
        new HtmlWebpackPlugin({
            publicPath: PUBLIC_DIR,
            filename: "index.html",
            template: `${ROOT_DIR}/index.html`,
            chunks: ['index'],
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            publicPath: PUBLIC_DIR,
            filename: "background.html",
            template: `${ROOT_DIR}/background.html`,
            chunks: ['background'],
            inject: "body"
        })
    ]
};

module.exports = webpackProdConfig;
