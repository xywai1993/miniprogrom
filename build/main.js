import { visit, parse as recastParse, print, types } from 'recast';
import { parse as vueSFCParse, compileScript } from '@vue/compiler-sfc';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { isNpmModule } from './util.js';
import { build as rollupBuild } from './rollup.js';
import { transformSync } from '@babel/core';
import glob from 'glob';
import path from 'path';
import { startTask } from '@yiper.fan/taskbuild';
import { effect, reactive } from '@vue/reactivity';
const targetDir = 'miniprogram';
rmSync(targetDir, { force: true, recursive: true });
const moduleCollection = reactive(new Map());
const jsCollection = reactive(new Set());
const fileCollection = reactive(new Map());
const allVueCollection = reactive(new Set());
effect(() => {
    console.log({ moduleCollection });
}, { lazy: true });
glob('src/**/*.vue', {}, function (er, files) {
    console.log({ files, where: 'glob 入口文件' });
    files.forEach((item) => allVueCollection.add(item));
    watchVueFile(files);
});
export function watchVueFile(files) {
    files.forEach((item) => {
        parseVueFile(item);
    });
    console.log({ jsCollection });
    // transformJs(jsCollection);
    // transformNpmUrl(fileCollection);
    // rollupNpm(moduleCollection);
    // // 没有任何依赖则直接转为小程序
    // allVueCollection.forEach((item) => {
    //     if (!fileCollection.has(item)) {
    //         console.log('讲道理只执行一次');
    //         const { templateContent, styleContent, scriptContent } = useVueSFC(item);
    //         writeVueToMiniProgram(item, scriptContent, templateContent || '', styleContent);
    //     }
    // });
}
export function watchJsFile(src) {
    collectMap(src);
    // transformJs(jsCollection);
    // transformNpmUrl(fileCollection);
    // rollupNpm(moduleCollection);
}
export function parseVueFile(src) {
    const { scriptContent, styleContent, templateContent } = useVueSFC(src);
    // 收集依赖
    collectMap(src, scriptContent, templateContent, styleContent);
}
function useVueSFC(src) {
    const file = readFileSync(src, { encoding: 'utf-8' });
    const result = vueSFCParse(file);
    const templateContent = result.descriptor.template?.content;
    const styleContent = result.descriptor.styles[0].content;
    const script = compileScript(result.descriptor, { refTransform: false, id: 'demo' });
    const scriptContent = script.content;
    return {
        templateContent,
        styleContent,
        scriptContent,
    };
}
// 收集依赖
function collectMap(src, vueScriptContent, vueTemplateContent, vueStyleContent) {
    const dirSrc = path.dirname(src);
    let file = readFileSync(src, { encoding: 'utf-8' });
    let fileName = '';
    const extName = path.extname(src);
    const collection = [];
    if (extName === '.vue') {
        file = vueScriptContent || '';
        fileName = path.basename(src, '.vue');
    }
    else {
        fileName = path.basename(src, '.js');
    }
    const recastAst = recastParse(file);
    // const b = types.builders;
    visit(recastAst, {
        visitImportDeclaration(data) {
            const node = data.node;
            if (isNpmModule(String(node.source.value))) {
                // @ts-ignore
                const specifiers = node.specifiers.map((item) => item.imported.name);
                const npmName = String(node.source.value);
                // 收集某个npm 导入了哪些方法
                npmCollectionFunction(npmName, specifiers);
                // 收集file内导入了哪些npm
                fileCollectionNpm(src, npmName, {
                    src,
                    dirSrc,
                    fileName,
                    relativeUrl: path.relative(dirSrc, 'src/rollup_modules/'),
                    fileContent: file,
                    vueScriptContent,
                    vueTemplateContent,
                    vueStyleContent,
                    extName,
                });
            }
            else {
                // console.log(error);
                let val = node.source.value;
                if (path.extname(String(val)) !== '.js') {
                    val += '.js';
                }
                const dir = path.join(dirSrc, String(val));
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
function npmCollectionFunction(npmName, specifiers) {
    if (moduleCollection.get(npmName)) {
        const newSet = moduleCollection.get(npmName);
        specifiers.forEach((item) => newSet?.add(item));
    }
    else {
        const newSet = new Set();
        specifiers.forEach((item) => newSet.add(item));
        moduleCollection.set(npmName, newSet);
    }
}
function fileCollectionNpm(fileSrc, npmName, otherData) {
    if (!fileCollection.get(fileSrc)) {
        const newSet = new Set();
        newSet.add(npmName);
        fileCollection.set(fileSrc, Object.assign({ npm: newSet }, otherData));
    }
    else {
        const newSet = fileCollection.get(fileSrc).npm;
        newSet.add(npmName);
    }
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
    writeFileSync(src.replace(/^src/, targetDir), output?.code || '', { encoding: 'utf-8' });
}
export function writeVueToMiniProgram(src, scriptContent, templateContent, styleContent) {
    const dirSrc = path.dirname(src);
    const fileName = path.basename(src, '.vue');
    const targetDirSrc = dirSrc.replace(/^src/, targetDir);
    const output = transformSync(scriptContent, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });
    mkdirSync(targetDirSrc, { recursive: true });
    writeFileSync(`${targetDirSrc}/${fileName}.js`, output?.code || '', { encoding: 'utf-8' });
    writeFileSync(`${targetDirSrc}/${fileName}.wxml`, templateContent, { encoding: 'utf-8' });
    writeFileSync(`${targetDirSrc}/${fileName}.wxss`, styleContent, { encoding: 'utf-8' });
}
function rollupNpm(moduleList) {
    moduleList.forEach((val, key) => {
        const b = types.builders;
        const specifiers = [...val].map((item) => b.importSpecifier(b.identifier(item)));
        const node = recastParse(`export {a} from 'b'`);
        node.program.body[0].specifiers = specifiers;
        node.program.body[0].source = b.literal(key);
        const id = `./rollupTmp-${Math.ceil(Math.random() * 10000)}.js`;
        writeFileSync(id, print(node).code);
        rollupBuild(id, key).then((url) => {
            rmSync(id);
        });
    });
}
function transformNpmUrl(fileList) {
    fileList.forEach((data, src) => {
        let file = readFileSync(src, { encoding: 'utf-8' });
        if (data.extName == '.vue') {
            const vue = useVueSFC(src);
            file = vue.scriptContent;
            data.vueTemplateContent = vue.templateContent;
            data.vueStyleContent = vue.styleContent;
        }
        const ast = recastParse(file);
        visit(ast, {
            visitImportDeclaration(p) {
                const node = p.node;
                if (data.npm.has(node.source.value)) {
                    node.source.value = path.join(data.relativeUrl, String(node.source.value) || '');
                    p.replace(node);
                }
                return false;
            },
        });
        if (data.extName == '.js') {
            writeJsToMiniProgram(src, print(ast).code);
        }
        if (data.extName == '.vue') {
            writeVueToMiniProgram(src, print(ast).code, data.vueTemplateContent || '', data.vueStyleContent || '');
        }
    });
}
function transformJs(jsList) {
    jsList.forEach((item) => {
        writeJsToMiniProgram(item);
    });
}
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
