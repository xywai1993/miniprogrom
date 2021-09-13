// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: './test.js',
    output: {
        file: 'bundle.js',
        format: 'cjs',
    },
    plugins: [resolve()],
};
