// const rollup = require('rollup');
import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';

// see below for details on the options

export async function build(input, key) {
    const inputOptions = {
        input,
        plugins: [resolve()],
    };
    // create a bundle
    const outputOptions = {
        // dir: './dist',
        file: `miniprogram/node_modules/${key}.js`,
        format: 'cjs',
    };
    const bundle = await rollup(inputOptions);

    // console.log(bundle.imports); // an array of external dependencies
    // console.log(bundle.exports); // an array of names exported by the entry point
    // console.log(bundle.modules); // an array of module objects

    // generate code and a sourcemap
    // const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);
    return outputOptions.file;
}

// build();
