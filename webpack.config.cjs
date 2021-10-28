const path = require('path');
const qs = require('querystring');
module.exports = {
    entry: { app: './test-src/test.vue' },
    mode: 'development',
    // mode: 'production',
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
                    // 'vue-loader',
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
