import { visit, parse as recastParse, print, types } from 'recast';
import { parse as vueSFCParse, compileScript, compileStyle } from '@vue/compiler-sfc';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { isNpmModule, usePathInfo } from './util.js';
import { build as rollupBuild } from './rollup.js';
import { transformSync } from '@babel/core';
import glob from 'glob';
import path from 'path/posix';
import { startTask } from '@yiper.fan/taskbuild';
console.time('program');
let targetDir = '';
let sourceDir = '';
// TODO: 记得删除
rmSync(targetDir, { force: true, recursive: true });
const moduleCollection = new Map();
const jsCollection = new Set();
const fileCollection = new Map();
// 初始转换入口

export function main(source, target) {
    sourceDir = source;
    targetDir = target;
    glob(`${sourceDir}/**/*.vue`, {}, function (er, files) {
        console.log({ files, where: 'glob 入口文件' });
        files.forEach((item) => {
            // 收集依赖
            collectMap(item);
        });
        transformFiles(fileCollection);
        rollupNpm(moduleCollection);
        console.timeEnd('program');

    });
    // 默认转移
    startTask({
        taskList: [
            {
                taskName: 'htmlMove',
                params: {
                    deployTo: targetDir,
                    root: sourceDir,
                    extname: ['.json'],
                },
            },
        ],
    });
}
export function watchVueFile(src) {
    // 收集依赖
    collectMap(src);
    if (!singeTransform(src)) {
        const { scriptContent, templateContent, styleContent, configContent } = useVueSFC(src);
        writeVueToMiniProgram(src, scriptContent, templateContent, styleContent, configContent);
    }
}
export function watchJsFile(src) {
    collectMap(src);
    if (!singeTransform(src)) {
        writeJsToMiniProgram(src);
    }
}
// 单页转换
function singeTransform(src) {
    let isTransform = false;
    if (fileCollection.has(src)) {
        isTransform = true;
        const newMap = new Map();
        const fileData = fileCollection.get(src);
        newMap.set(src, fileData);
        transformFiles(newMap);
        // 判断是否需要重新打包npm
        const npm = fileData?.npm;
        const newModules = new Map();
        npm?.forEach((item) => {
            newModules.set(item, moduleCollection.get(item));
        });
        rollupNpm(newModules);
    }
    return isTransform;
}
function useVueSFC(src) {
    const { fileName } = usePathInfo(src);
    const file = useFileContentSync(src);
    const result = vueSFCParse(file);
    const templateContent = result.descriptor.template?.content || '';
    const style = result.descriptor.styles[0]?.content;
    const script = compileScript(result.descriptor, { refTransform: false, id: 'demo' });
    const scriptContent = script.content;
    const configContent = result.descriptor.customBlocks[0]?.content || '';
    const styleContent = compileStyle({ source: style, filename: fileName, id: fileName, preprocessLang: 'less' });
    return {
        templateContent,
        styleContent: styleContent.code,
        scriptContent,
        configContent,
    };
}
// 收集依赖
function collectMap(src) {
    const { dirSrc, extName, fileName } = usePathInfo(src);
    let file = '';
    const collection = [];
    if (extName === '.vue') {
        const { scriptContent } = useVueSFC(src);
        file = scriptContent;
    }
    else {
        file = useFileContentSync(src);
    }
    const recastAst = recastParse(file);
    // const b = types.builders;
    // 元素置空，从新收集
    fileCollection.delete(src);
    const collectionData = {
        npm: new Set(),
        jsAst: recastAst,
        src,
    };
    visit(recastAst, {
        visitImportDeclaration(data) {
            const node = data.node;
            if (isNpmModule(String(node.source.value))) {
                // @ts-ignore
                const specifiers = node.specifiers.map((item) => item.imported.name);
                const npmName = String(node.source.value);
                // 收集某个npm 导入了哪些方法
                npmCollectionFunction(npmName, specifiers);
                // collectionData.relativeUrl = path.relative(dirSrc, path.join(sourceDir, 'rollup_modules'));
                collectionData.npm.add(npmName);
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
    fileCollection.set(src, collectionData);
    collection.forEach((item) => {
        //  循环搜集依赖
        collectMap(item);
    });
}
// 收集npm使用了哪些方法
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
/**
 * 转换代码为es5并写入miniprogram
 * @param {path} src 文件path
 * @param {string} [content] 文件内容，
 */
export function writeJsToMiniProgram(src, content) {
    const file = content || useFileContentSync(src);
    const output = transformSync(file, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });
    const targetSrc = path.join(targetDir, path.relative(sourceDir, src));
    const targetDirSrc = path.dirname(targetSrc);
    mkdirSync(targetDirSrc, { recursive: true });
    writeFileSync(targetSrc, output?.code || '', { encoding: 'utf-8' });
    console.count(`writeJsToMiniProgram-->${src}`);
}
export function writeVueToMiniProgram(src, scriptContent, templateContent, styleContent, configContent) {
    const { dirSrc, fileName } = usePathInfo(src);
    const targetDirSrc = path.join(targetDir, path.relative(sourceDir, dirSrc));
    const output = transformSync(scriptContent, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });
    mkdirSync(targetDirSrc, { recursive: true });
    writeFileSync(`${targetDirSrc}/${fileName}.js`, output?.code || '', { encoding: 'utf-8' });
    if (templateContent) {
        writeFileSync(`${targetDirSrc}/${fileName}.wxml`, templateContent, { encoding: 'utf-8' });
    }
    if (styleContent) {
        writeFileSync(`${targetDirSrc}/${fileName}.wxss`, styleContent, { encoding: 'utf-8' });
    }
    if (configContent) {
        writeFileSync(`${targetDirSrc}/${fileName}.json`, configContent, { encoding: 'utf-8' });
    }
    console.count(`writeVueToMiniProgram-->${src}`);
}
function transformFiles(fileList) {
    fileList.forEach((data, src) => {
        const { extName, dirSrc } = usePathInfo(src);
        // const ast = recastParse(file);
        const ast = data.jsAst;
        visit(ast, {
            visitImportDeclaration(p) {
                const node = p.node;
                // 转换npm模块地址为相对地址
                if (data.npm.has(String(node.source.value))) {
                    console.count(`transformNpmUrl-->${node.source.value}`);
                    const relativeUrl = path.relative(dirSrc, path.join(sourceDir, 'rollup_modules'));
                    node.source.value = path.join(relativeUrl, String(node.source.value) || '');
                    p.replace(node);
                }
                return false;
            },
        });
        if (extName == '.js') {
            writeJsToMiniProgram(src, print(ast).code);
        }
        if (extName == '.vue') {
            const { templateContent, styleContent, configContent } = useVueSFC(src);
            writeVueToMiniProgram(src, print(ast).code, templateContent, styleContent, configContent);
        }
    });
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
        console.count(`rollupNpm-->${key}`);
    });
}
function useFileContentSync(src) {
    console.count(`useFileContentSync-->${src}`);
    return readFileSync(src, { encoding: 'utf-8' });
}
main('test-src', 'miniprogram');
