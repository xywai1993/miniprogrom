import { visit, parse as recastParse, print, types } from 'recast';
import { parse as vueSFCParse, compileScript } from '@vue/compiler-sfc';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { createRequire } from 'module';
import { build as rollupBuild } from './rollup.js';
import { transformSync } from '@babel/core';
import glob from 'glob';
import path from 'path';

const require = createRequire(import.meta.url);
const npmCollection = new Map();
const jsCollection = new Set();

glob('./src/**/*.vue', {}, function (er, files) {
    console.log({ files, where: 'glob 入口文件' });
    files.forEach((item) => {
        parseVueFile(item);
    });
});

export function parseVueFile(src) {
    const fileName = path.basename(src, '.vue');
    const dirSrc = path.dirname(src);
    const file = readFileSync(src, { encoding: 'utf-8' });
    const result = vueSFCParse(file);
    const templateContent = result.descriptor.template.content;
    const styleContent = result.descriptor.styles[0].content;
    const script = compileScript(result.descriptor, { refTransform: false, id: 'demo' });
    const scriptContent = script.content;

    // console.log(pugRender(result.descriptor.template));
    // console.log(result.descriptor.template);

    collectMap(src, scriptContent, templateContent, styleContent);

    console.log({ npmCollection, jsCollection });

    transformNpm(npmCollection);
    transformJs(jsCollection);

    //TODO: babel 转换方案
    // const output = transformSync(script.content, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });
}

// 收集依赖
function collectMap(src, vueScriptContent, vueTemplateContent, vueStyleContent) {
    const dirSrc = path.dirname(src);
    let file = readFileSync(src, { encoding: 'utf-8' });
    let fileName = path.basename(src, '.js');
    const extName = path.extname(src);

    const collection = [];

    if (extName === '.vue') {
        file = vueScriptContent;
        fileName = path.basename(src, '.vue');
    }
    console.log({ dirSrc, fileName, extName });

    const recastAst = recastParse(file);
    // const b = types.builders;

    visit(recastAst, {
        visitImportDeclaration(data) {
            const node = data.node;
            try {
                // 假如是npm模块，直接解析地址

                const node_modules_url = require.resolve(node.source.value);

                // collection.push(require.resolve(node.source.value));
                // const node_modules_path = node_modules_url.split('node_modules');
                // const filePath = path.join('miniprogram/node_modules', node_modules_path[1]);
                // const _dirSrc = path.dirname(filePath);
                // node.source.value = filePath;
                // data.replace(node);
                const specifiers = node.specifiers.map((item) => item.imported.name);
                console.log('npm 模块，TODO', specifiers);

                const collectionData = { src, node, specifiers, vueScriptContent, vueTemplateContent, vueStyleContent, extName };
                // npmCollection.push(node_modules_url);
                if (!npmCollection.get(node.source.value)) {
                    npmCollection.set(node.source.value, [collectionData]);
                } else {
                    npmCollection.get(node.source.value).push(collectionData);
                    // ls.push(src);
                    // npmCollection.set(node.source.value, [src]);
                }
                return false;
            } catch (error) {
                let val = node.source.value;
                if (path.extname(val) !== '.js') {
                    val += '.js';
                }
                const dir = path.join(dirSrc, val);
                jsCollection.add(dir);
                collection.push(dir);
            }
            return false;
        },
    });

    collection.forEach((item) => {
        //  循环搜集依赖
        console.log({ item, where: '依赖循环处理' });
        // jsCollection.push(item);

        collectMap(item);

        // 转换并写入miniprogram;
    });
}

/**
 * 转换代码为es5并写入miniprogram
 * @param {path} src 文件path
 */
export function writeJsToMiniProgram(src) {
    const dirSrc = path.dirname(src);
    const file = readFileSync(src, { encoding: 'utf-8' });
    const output = transformSync(file, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });

    mkdirSync(dirSrc.replace(/^src/, 'miniprogram'), { recursive: true });
    writeFileSync(src.replace(/^src/, 'miniprogram'), output.code, { encoding: 'utf-8' }, { flag: 'wr+' });
}

export function writeVueToMiniProgram(fileName, scriptContent, templateContent, styleContent) {
    mkdirSync(`miniprogram/pages/${fileName}/`, { recursive: true });
    writeFileSync(`miniprogram/pages/${fileName}/${fileName}.js`, scriptContent, { encoding: 'utf-8' });
    writeFileSync(`miniprogram/pages/${fileName}/${fileName}.wxml`, templateContent, { encoding: 'utf-8' });
    writeFileSync(`miniprogram/pages/${fileName}/${fileName}.wxss`, styleContent, { encoding: 'utf-8' });
}

function transformNpm(npmList) {
    // for (let [key, value] of npmList.entries()) {
    //     console.log(key + ' = ' + value);
    // }

    npmList.forEach((val, key) => {
        console.log({ key, val });
        let node = null;
        let specifiers = [];
        val.forEach((data) => {
            data.node.type = 'ExportNamedDeclaration';
            // code += print(data.node).code;
            node = data.node;
            // specifiers.concat(data.specifiers);
            specifiers = [...specifiers, ...data.specifiers];
        });
        console.log({ specifiers });
        const b = types.builders;
        node.specifiers = [...new Set(specifiers)].map((item) => b.importSpecifier(b.identifier(item)));
        writeFileSync('./rollupTmp.js', print(node).code);
        rollupBuild(key).then((url) => {
            console.log({ url, where: 'rollupbuild' });
            // node.source.value = './miniprogram/bundle.js';
            // writeFileSync('./rollupTmp.js', print(node).code);
        });
    });
}

function transformJs(jsList) {
    jsList.forEach((item) => {
        writeJsToMiniProgram(item);
    });
}

// const code = readFileSync('./src/pages/main.vue', { encoding: 'utf-8' });

// const result = vueParse(code);

// const ast = parse(result.descriptor.script?.content || '');
// const b = types.builders;
// let promise = null;
// visit(ast, {
//     visitImportDeclaration(path) {
//         const node = path.node;

//         try {
//             const id = require.resolve(node.source.value);
//             node.type = 'ExportNamedDeclaration';
//             writeFileSync('./rollupTmp.js', print(node).code);
//             promise = rollupBuild()
//                 .then(() => {
//                     node.source.value = './bundle.js';
//                     writeFileSync('./rollupTmp.js', print(node).code);
//                 })
//                 .catch(console.log);
//         } catch (error) {
//             // 非npm模块
//             // console.log(error, node.source.value);
//         }
//         return false;
//     },
// });

// promise.then(() => {
//     console.log(print(ast).code);
// });
