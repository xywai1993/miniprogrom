const path = require('path');
const qs = require('querystring');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    entry: { app: './test-src/test.vue', 'pages/index/main': './test-src/pages/index/main.vue' },
    // mode: 'development',
    mode: 'production',
    target: 'node',
    // output: { path: path.resolve(__dirname, './miniprogram') },
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
        },
    },
    module: {
        rules: [
            {
                loader: require.resolve('./loader/pitch-loader.cjs'),
                resourceQuery: (query) => {
                    if (!query) {
                        return false;
                    }
                    const parsed = qs.parse(query.slice(1));
                    return parsed.vue != null;
                },
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: path.resolve(__dirname, './loader/demo-loader.cjs'),
                    },
                ],
            },
            {
                test: /.css$/i,
                use: ['css-loader'],
            },
        ],
    },
    // plugins: [new VueLoaderPlugin()],
};
