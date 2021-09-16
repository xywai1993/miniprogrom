// const rollup = require('rollup');
import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// see below for details on the options
const Global = `var process = {
    env: {
      NODE_ENV: 'production'
    }
  }`;

export async function build(input: string, key: string) {
    const inputOptions = {
        input,
        plugins: [resolve(), commonjs()],
    };
    // create a bundle
    const outputOptions = {
        // dir: './dist',
        file: `miniprogram/rollup_modules/${key}.js`,
        format: 'cjs',
        intro: Global,
    };
    const bundle = await rollup(inputOptions);

    // console.log(bundle.imports); // an array of external dependencies
    // console.log(bundle.exports); // an array of names exported by the entry point
    // console.log(bundle.modules); // an array of module objects

    // generate code and a sourcemap
    // const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    // @ts-ignore
    await bundle.write(outputOptions);
    return outputOptions.file;
}

// build();
