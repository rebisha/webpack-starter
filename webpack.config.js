const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: sourcePath,
    entry: {
        app: './index.js'
    },
    output: {
        path: outPath,
        filename: isProduction ? '[name].js' : '[name].[fullhash].js',
        chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[fullhash].js'
    },
    target: 'web',
    mode: 'none',
    resolve: {
        extensions: [".js", ".tsx", "ts", ".scss"],
        alias: {
            src: path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [            
            {
                test: /\.s[ac]ss$/,
                exclude: /\.module.s[ac]ss$/,
                use: [
                    isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,                   
                    "css-loader",
                    "resolve-url-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader"
            }
        ]
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? "[name].css" : "[name].[fullhash].css",
            chunkFilename: isDevelopment ? "[id].css" : "[id].[fullhash].css"
        })
    ],
    devServer: {
        contentBase: "./dist",
        port: 8080,
        historyApiFallback: true
    }
};