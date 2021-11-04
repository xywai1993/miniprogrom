const path = require('path');
const qs = require('querystring');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

function getEntry(rootSrc, paths) {
    var map = {};
    glob.sync(rootSrc + paths).forEach((file) => {
        var key = path.relative(rootSrc, file).replace('.vue', '');
        map[key] = file;
    });
    return map;
}

const appEntry = { app: resolve('./test-src/app.vue') };
const pagesEntry = getEntry(resolve('./test-src'), '/pages/**/main.vue');
const component = getEntry(resolve('./test-src'), '/components/**/main.vue');
// const pagesEntryB = getEntry(resolve('./src'), '/packageb/pages/**/main.js');
// const pagesEntryC = getEntry(resolve('./src'), '/packagec/pages/**/main.js');
const entry = Object.assign({}, appEntry, pagesEntry, component);

console.log({ entry });
module.exports = {
    entry,
    // mode: 'development',
    mode: 'production',
    target: 'node',
    // output: { path: path.resolve(__dirname, './miniprogram') },
    output: {
        publicPath: 'http://localhost:3333/dist/',
    },
    resolve: {
        extensions: ['.js'],
    },
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
        },
    },
    resolveLoader: {
        alias: {
            'demo-loader': path.resolve(__dirname, './loader/demo-loader.cjs'),
            'wxss-loader': path.resolve(__dirname, './loader/wxss-loader.cjs'),
            'wxml-loader': path.resolve(__dirname, './loader/wxml-loader.cjs'),
        },
    },
    module: {
        rules: [
            // {
            //     loader: require.resolve('./loader/pitch-loader.cjs'),
            //     resourceQuery: (query) => {
            //         if (!query) {
            //             return false;
            //         }
            //         const parsed = qs.parse(query.slice(1));
            //         return parsed.vue != null;
            //     },
            // },
            {
                resourceQuery: /asset-resource/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext][query]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset/resource',
                // type: 'asset',
                // options: {
                //     limit: 6,
                //     name: utils.assetsPath('img/[name].[hash:5].[ext]'),
                // },
                generator: {
                    filename: 'img/[name].[hash:5][ext]',
                },
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 4 * 1024, // 4kb
                //     },
                // },
            },

            {
                test: /\.vue$/,
                oneOf: [
                    {
                        resourceQuery: /css/, // foo.css?inline
                        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'wxss-loader'],
                    },
                    {
                        resourceQuery: /template/, // foo.css?external
                        use: ['wxml-loader'],
                    },
                ],
                // use: ['demo-loader'],
                use: [
                    {
                        loader: path.resolve(__dirname, './loader/demo-loader.cjs'),
                        options: {
                            root: 'test-src',
                        },
                    },
                ],
            },

            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 6,
            //         name: 'img/[name].[hash:5].[ext]',
            //     },
            // },

            // {
            //     test: /.css$/i,
            //     use: ['css-loader'],
            // },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].wxss',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*.json',
                    to: '',
                    context: 'test-src/',
                },
            ],
        }),
    ],
};
