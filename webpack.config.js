const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
    entry: {
        app: {
            import: path.resolve(__dirname, 'src/app.js'),
        },
        index: {
            import: path.resolve(__dirname, 'src/pages/index.js'),
        },
        pois: {
            import: path.resolve(__dirname, 'src/pages/pois.js'),
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/templates", "index.html"),
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['app', 'index']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/templates", "pois.html"),
            filename: 'pois.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['app', 'pois']
        }),
        //new BundleAnalyzerPlugin()
    ],
    devServer: {
        hot: true,
        open: true,
        watchFiles: ['src/**/*']
    },
};