import { visit, parse as recastParse, print, types } from 'recast';
import { parse as vueSFCParse, compileScript } from '@vue/compiler-sfc';
import { readFileSync, writeFileSync, mkdirSync, rmSync, rmdirSync } from 'fs';
import { isNpmModule, usePathInfo } from './util.js';
import { build as rollupBuild } from './rollup.js';
import { transformSync } from '@babel/core';
import glob from 'glob';
import path from 'path/posix';
import { startTask } from '@yiper.fan/taskbuild';

const targetDir = 'miniprogram';
const sourceDir = 'src';
rmSync(targetDir, { force: true, recursive: true });

const moduleCollection: Map<string, Set<string>> = new Map();
const jsCollection: Set<string> = new Set();
const fileCollection: Map<string, any> = new Map();
const allVueCollection: Set<string> = new Set();

// 初始转换入口
glob('src/**/*.vue', {}, function (er, files) {
    console.log({ files, where: 'glob 入口文件' });

    files.forEach((item) => allVueCollection.add(item));

    files.forEach((item) => {
        const { scriptContent, styleContent, templateContent } = useVueSFC(item);
        // 收集依赖
        collectMap(item, scriptContent, templateContent, styleContent);
    });

    transformJs(jsCollection);
    transformNpmUrl(fileCollection);
    rollupNpm(moduleCollection);

    // 没有任何依赖则直接转为小程序
    allVueCollection.forEach((item) => {
        if (!fileCollection.has(item)) {
            const { templateContent, styleContent, scriptContent } = useVueSFC(item);
            writeVueToMiniProgram(item, scriptContent, templateContent || '', styleContent);
        }
    });
});

export function watchVueFile(src: string) {
    const { scriptContent, styleContent, templateContent } = useVueSFC(src);

    // 收集依赖
    collectMap(src, scriptContent, templateContent, styleContent);

    if (!singeTransform(src)) {
        writeVueToMiniProgram(src, scriptContent, templateContent, styleContent);
    }
}

export function watchJsFile(src: string) {
    collectMap(src);
    if (!singeTransform(src)) {
        writeJsToMiniProgram(src);
    }
}

// 单页转换
function singeTransform(src: string) {
    let isTransform = false;
    if (jsCollection.has(src)) {
        isTransform = true;
        // transformJs(jsCollection);
        writeJsToMiniProgram(src);
    }

    if (fileCollection.has(src)) {
        isTransform = true;
        transformNpmUrl(fileCollection);
    }

    if (moduleCollection.has(src)) {
        isTransform = true;
        rollupNpm(moduleCollection);
    }
    return isTransform;
}

function useVueSFC(src: string) {
    const file = readFileSync(src, { encoding: 'utf-8' });
    const result = vueSFCParse(file);
    const templateContent = result.descriptor.template?.content;
    const styleContent = result.descriptor.styles[0].content;
    const script = compileScript(result.descriptor, { refTransform: false, id: 'demo' });
    const scriptContent = script.content;

    return {
        templateContent: templateContent || '',
        styleContent,
        scriptContent,
    };
}

// 收集依赖
function collectMap(src: string, vueScriptContent?: string, vueTemplateContent?: string, vueStyleContent?: string) {
    const { dirSrc, extName, fileName } = usePathInfo(src);
    let file = readFileSync(src, { encoding: 'utf-8' });

    const collection: string[] = [];

    if (extName === '.vue') {
        file = vueScriptContent || '';
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

                    relativeUrl: path.relative(dirSrc, path.join(sourceDir, 'rollup_modules')),
                    fileContent: file,
                    vueScriptContent,
                    vueTemplateContent,
                    vueStyleContent,
                });
            } else {
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

function npmCollectionFunction(npmName: string, specifiers: string[]) {
    if (moduleCollection.get(npmName)) {
        const newSet = moduleCollection.get(npmName);
        specifiers.forEach((item) => newSet?.add(item));
    } else {
        const newSet: Set<string> = new Set();
        specifiers.forEach((item) => newSet.add(item));
        moduleCollection.set(npmName, newSet);
    }
}

function fileCollectionNpm(
    fileSrc: string,
    npmName: string,
    otherData: {
        src: string;
        relativeUrl: string;
        fileContent: string;
        vueScriptContent: string | undefined;
        vueTemplateContent: string | undefined;
        vueStyleContent: string | undefined;
    }
) {
    if (!fileCollection.get(fileSrc)) {
        const newSet = new Set();
        newSet.add(npmName);
        fileCollection.set(fileSrc, Object.assign({ npm: newSet }, otherData));
    } else {
        const newSet = fileCollection.get(fileSrc).npm;
        newSet.add(npmName);
    }
}

/**
 * 转换代码为es5并写入miniprogram
 * @param {path} src 文件path
 * @param {string} [content] 文件内容，
 */
export function writeJsToMiniProgram(src: string, content?: string) {
    const file = readFileSync(src, { encoding: 'utf-8' });
    const output = transformSync(content || file, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });

    const targetSrc = path.join(targetDir, path.relative(sourceDir, src));
    const targetDirSrc = path.dirname(targetSrc);

    mkdirSync(targetDirSrc, { recursive: true });
    writeFileSync(targetSrc, output?.code || '', { encoding: 'utf-8' });

    console.count('writeJsToMiniProgram');
}

export function writeVueToMiniProgram(src: string, scriptContent: string, templateContent: string, styleContent: string) {
    const { dirSrc, fileName } = usePathInfo(src);
    // const targetDirSrc = dirSrc.replace(/^src/, targetDir);
    const targetDirSrc = path.join(targetDir, path.relative(sourceDir, dirSrc));
    // console.log(`${targetDir} - ${path.relative('src', dirSrc)}`);

    const output = transformSync(scriptContent, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });

    mkdirSync(targetDirSrc, { recursive: true });
    writeFileSync(`${targetDirSrc}/${fileName}.js`, output?.code || '', { encoding: 'utf-8' });
    writeFileSync(`${targetDirSrc}/${fileName}.wxml`, templateContent, { encoding: 'utf-8' });
    writeFileSync(`${targetDirSrc}/${fileName}.wxss`, styleContent, { encoding: 'utf-8' });

    console.count('writeVueToMiniProgram');
}

function rollupNpm(moduleList: Map<string, Set<string>>) {
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
    console.count('rollupNpm');
}

function transformNpmUrl(
    fileList: Map<
        string,
        {
            src: string;
            relativeUrl: string;
            fileContent: string;
            vueScriptContent: string | undefined;
            vueTemplateContent: string | undefined;
            vueStyleContent: string | undefined;
            npm: Set<any>;
        }
    >
) {
    fileList.forEach((data, src) => {
        const { extName } = usePathInfo(src);
        let file = readFileSync(src, { encoding: 'utf-8' });

        if (extName == '.vue') {
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
                    // node.source.value = path.join(data.relativeUrl, String(node.source.value) || '');
                    node.source.value = path.join(data.relativeUrl, String(node.source.value) || '');
                    p.replace(node);
                }
                return false;
            },
        });

        if (extName == '.js') {
            writeJsToMiniProgram(src, print(ast).code);
        }

        if (extName == '.vue') {
            writeVueToMiniProgram(src, print(ast).code, data.vueTemplateContent || '', data.vueStyleContent || '');
        }
    });

    console.count('transformNpmUrl');

    // fileCollection.clear();
}

function transformJs(jsList: Set<string>) {
    jsList.forEach((item) => {
        writeJsToMiniProgram(item);
    });
    // jsList.clear();
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
