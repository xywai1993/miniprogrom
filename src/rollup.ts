import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { join } from 'path/posix';

// see below for details on the options
const Global = `var process = {
    env: {
      NODE_ENV: 'production'
    }
  }`;

/**
 * 打包
 * @param input filePath
 * @param key 打包后的文件名
 * @param targetDir 打包后的目标路径
 * @returns
 */
export async function build(input: string, key: string, targetDir: string) {
    const inputOptions = {
        input,
        plugins: [resolve(), commonjs()],
    };
    // create a bundle
    const outputOptions = {
        // dir: './dist',
        file: join(targetDir, `/rollup_modules/${key}.js`),
        format: 'cjs',
        intro: Global,
    };
    const bundle = await rollup(inputOptions);

    // generate code and a sourcemap
    // const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    // @ts-ignore
    await bundle.write(outputOptions);
    return outputOptions.file;
}

// build();
