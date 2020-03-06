const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const ParalleUglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../server/dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.runtime.esm.js',
          '@': path.resolve(__dirname, '../packages')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    optimization: {
        minimizer: [
            new ParalleUglifyPlugin({
                uglifyJS: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        // drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    }
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new vueLoaderPlugin(),
    ]
}