const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const DashboardPlugin = require("webpack-dashboard/plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

// 用了这个插件实现了 antd 的按需加载，打包后可以剩下一半的大小
const tsImportPluginFactory = require('ts-import-plugin')

const config = {
    mode: process.env.NODE_ENV == "production" ? "production" : "development", //默认是开发模块
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },
    // 配置 my-px2rem-loader 的别名
    resolveLoader: {
        alias: {
            "my-px2rem-loader": path.resolve(__dirname, 'src/loaders/my-px2rem-loader.js')
        },
    },

    devtool: "source-map",
    devServer: {
        hot: true, // 热更新插件
        contentBase: path.join(__dirname, "dist"), // 设置dist为静态资源目录
        historyApiFallback: {
            // browserHistory的时候，刷新如果报了404，那么就自动重定向到index.html
            index: "./index.html",
        },
    },
    resolve: {
        // 设置别名
        alias: {
            "@": path.resolve(__dirname, "src"),
            "~": path.resolve(__dirname, "node_modules"),
        },
        //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名，先找ts文件，再找tsx文件。。。
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        noParse: /jquery|lodash/,
        rules: [{
                test: /\.(j|t)sx?$/, // 包括了 jsx tsx js ts
                use: [{
                        loader: 'thread-loader',
                        options: {
                            workers: 3 // 表示开3个进程, 一般填的是自己电脑的核数减一, 因为master进程占一个
                        }
                    },
                    "ts-loader"
                ],

                // options: {
                //     transpileOnly: true, // 表示只转译，不检查, 可以提高编译速度
                //     getCustomTransformers: () => ({ // 定义自定义的转换器
                //         before: [tsImportPluginFactory({
                //             "libraryName": 'antd', // 表示对antd进行按需加载
                //             "libraryDirectory": "es", // 按需加载的模块，如果实现按需加载，必须是 es Modules
                //             "style": "css" // 自动引入它对应的css
                //         })]
                //     }),
                //     // compilerOptions: {
                //     //     module: "es2015"
                //     // }
                // },
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.(j|t)sx?$/,
                loader: 'source-map-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },

                    // 因为版本问题，这个插件老是搞不好
                    // , {
                    //     loader: 'px2rem-loader',
                    //     options: {
                    //         // 下面设置为 75，表示 1rem 就等于 75px
                    //         // 那么假如设计稿是 750px, 且上面有个盒子量出来的是 200px， 1/75px = x/200px, 75x = 200，即 200/75 = 2.66666667rem, 因此该元素就是 2.66666667 rem
                    //         remUnit: 75, 
                    //         remPrecesion: 8
                    //     }
                    // }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader",
                    {
                        loader: 'my-px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                            exclude: /antd\.css/ // 这里是解决第三方库问题的，表示这个 antd.css 文件不用转为rem
                        }
                    },
                    "less-loader"
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                use: ["url-loader"],
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        // 热更新插件, 下面要跟 hot: true 配合使用，他是webpack内置的插件不需要安装
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [{
                    module: 'react',
                    entry: 'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
                    global: 'ReactDOM',
                },
            ],
        }),
        new webpack.IgnorePlugin({
            // 下面两行代码的意思表示忽略引入 node_modules\moment\locale 文件夹，那么其下面的语言包就自热而然不会被引入
            contextRegExp: /moment$/,
            resourceRegExp: /^\.\/locale/,
        }),
    ],
};

module.exports = smp.wrap(config)