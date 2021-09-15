// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const Global = `var process = {
    env: {
      NODE_ENV: 'production'
    }
  }`;

export default {
    input: './test.js',
    output: {
        file: 'bundle.js',
        format: 'cjs',
        intro: Global,
    },
    plugins: [resolve(), commonjs()],
};
