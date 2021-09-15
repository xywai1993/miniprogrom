import { visit, parse as recastParse, print, types } from 'recast';
import { parse as vueSFCParse, compileScript } from '@vue/compiler-sfc';
import { readFileSync, writeFileSync, mkdirSync, rmSync, rmdirSync } from 'fs';
import { createRequire } from 'module';
import { build as rollupBuild } from './rollup.js';
import { transformSync } from '@babel/core';
import glob from 'glob';
import path from 'path';
import { startTask } from '@yiper.fan/taskbuild';

const require = createRequire(import.meta.url);

const targetDir = 'miniprogram';
rmSync(targetDir, { force: true, recursive: true });

let npmCollection = new Map();
let moduleCollection = new Map();
let jsCollection = new Set();

glob('src/**/*.vue', {}, function (er, files) {
    console.log({ files, where: 'glob 入口文件' });

    // files.forEach((item) => {
    //     watchVueFile(item);
    // });
    watchVueFile(files);
});

export function watchVueFile(files) {
    files.forEach((item) => {
        parseVueFile(item);
    });
    console.log({ moduleCollection });
    transformJs(jsCollection);
    transformNpmUrl(npmCollection);
    rollupNpm(moduleCollection);
}

export function watchJsFile(src) {
    collectMap(src);
    transformJs(jsCollection);
    transformNpmUrl(npmCollection);
    rollupNpm(moduleCollection);
}

export function parseVueFile(src) {
    const file = readFileSync(src, { encoding: 'utf-8' });
    const result = vueSFCParse(file);
    const templateContent = result.descriptor.template.content;
    const styleContent = result.descriptor.styles[0].content;
    const script = compileScript(result.descriptor, { refTransform: false, id: 'demo' });
    const scriptContent = script.content;

    // 收集依赖
    collectMap(src, scriptContent, templateContent, styleContent);

    // 没有依赖则直接转换为小程序页面
    const dirSrc = path.dirname(src);
    const fileName = path.basename(src, '.vue');
    writeVueToMiniProgram(fileName, dirSrc, scriptContent, templateContent, styleContent);
}

// 收集依赖
function collectMap(src, vueScriptContent, vueTemplateContent, vueStyleContent) {
    const dirSrc = path.dirname(src);
    let file = readFileSync(src, { encoding: 'utf-8' });
    let fileName = '';
    const extName = path.extname(src);

    const collection = [];

    if (extName === '.vue') {
        file = vueScriptContent;
        fileName = path.basename(src, '.vue');
    } else {
        fileName = path.basename(src, '.js');
    }

    const recastAst = recastParse(file);
    // const b = types.builders;

    visit(recastAst, {
        visitImportDeclaration(data) {
            const node = data.node;

            try {
                // 假如是npm模块，直接解析地址

                const node_modules_url = require.resolve(node.source.value);

                const specifiers = node.specifiers.map((item) => item.imported.name);

                const targetUrl = `src/rollup_modules/${node.source.value}.js`;
                const relativeUrl = path.relative(dirSrc, targetUrl);
                const collectionData = {
                    src, // 文件源目录
                    dirSrc,
                    fileName, //文件名
                    npmName: node.source.value,
                    node, //ast node
                    specifiers, // 导入的关键字  from { a } from '@vue' , 则 specifiers 为['a']
                    vueScriptContent,
                    vueTemplateContent,
                    vueStyleContent,
                    extName,
                    fileContent: file,
                    ast: recastAst,
                    relativeUrl,
                };

                if (!npmCollection.get(node.source.value)) {
                    npmCollection.set(node.source.value, [collectionData]);
                } else {
                    npmCollection.get(node.source.value).push(collectionData);
                }

                // 收集某个npm 导入了哪些方法
                if (!moduleCollection.get(node.source.value)) {
                    const newSet = new Set();
                    specifiers.forEach((item) => newSet.add(item));
                    moduleCollection.set(node.source.value, newSet);
                } else {
                    const newSet = moduleCollection.get(node.source.value);
                    specifiers.forEach((item) => newSet.add(item));
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
        collectMap(item);
    });
}

/**
 * 转换代码为es5并写入miniprogram
 * @param {path} src 文件path
 * @param {string} [content] 文件内容，
 */
export function writeJsToMiniProgram(src, content) {
    const dirSrc = path.dirname(src);
    const file = readFileSync(src, { encoding: 'utf-8' });
    const output = transformSync(content || file, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });

    mkdirSync(dirSrc.replace(/^src/, targetDir), { recursive: true });
    writeFileSync(src.replace(/^src/, targetDir), output.code, { encoding: 'utf-8' }, { flag: 'wr+' });
}

export function writeVueToMiniProgram(fileName, dirSrc, scriptContent, templateContent, styleContent) {
    console.log({ fileName, dirSrc });
    const targetDirSrc = dirSrc.replace(/^src/, targetDir);

    const output = transformSync(scriptContent, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });

    mkdirSync(targetDirSrc, { recursive: true });
    writeFileSync(`${targetDirSrc}/${fileName}.js`, output.code, { encoding: 'utf-8' });
    writeFileSync(`${targetDirSrc}/${fileName}.wxml`, templateContent, { encoding: 'utf-8' });
    writeFileSync(`${targetDirSrc}/${fileName}.wxss`, styleContent, { encoding: 'utf-8' });
}

function rollupNpm(moduleList) {
    // npmList.forEach((val, key) => {
    //     let node = null;
    //     let specifiers = [];

    //     val.forEach((data) => {
    //         data.node.type = 'ExportNamedDeclaration';
    //         node = data.node;
    //         specifiers = [...specifiers, ...data.specifiers];
    //     });

    //     const b = types.builders;
    //     node.specifiers = [...new Set(specifiers)].map((item) => b.importSpecifier(b.identifier(item)));
    //     console.log(node);
    //     const test = recastParse(`export {a} from 'vue'`);
    //     test.program.body[0].specifiers = [b.importSpecifier(b.identifier('s'))];
    //     test.program.body[0].source = b.literal('vue');
    //     console.log(print(test).code);
    //     const id = `./rollupTmp-${Math.ceil(Math.random() * 10000)}.js`;
    //     writeFileSync(id, print(node).code);
    //     rollupBuild(id, key).then((url) => {
    //         rmSync(id);
    //     });
    // });

    moduleList.forEach((val, key) => {
        const b = types.builders;
        const specifiers = [...val].map((item) => b.importSpecifier(b.identifier(item)));

        const node = recastParse(`export {a} from 'b'`);
        node.program.body[0].specifiers = specifiers;
        node.program.body[0].source = b.literal(key);
        console.log(print(node).code);
        const id = `./rollupTmp-${Math.ceil(Math.random() * 10000)}.js`;
        writeFileSync(id, print(node).code);
        rollupBuild(id, key).then((url) => {
            rmSync(id);
        });
    });

    // moduleCollection.forEach()
}

function transformNpmUrl(npmList) {
    npmList.forEach((val, key) => {
        val.forEach((data) => {
            const ast = recastParse(data.fileContent);

            visit(ast, {
                visitImportDeclaration(path) {
                    const node = path.node;
                    if (data.npmName == node.source.value) {
                        node.source.value = data.relativeUrl;
                        path.replace(node);
                    }
                    return false;
                },
            });

            if (data.extName == '.js') {
                writeJsToMiniProgram(data.src, print(ast).code);
            }

            if (data.extName == '.vue') {
                writeVueToMiniProgram(data.fileName, data.dirSrc, print(ast).code, data.vueTemplateContent, data.vueStyleContent);
            }
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

startTask({
    taskList: [
        {
            taskName: 'htmlMove',
            params: {
                deployTo: targetDir,
                root: 'src',
                extname: ['json'],
            },
        },
    ],
});
