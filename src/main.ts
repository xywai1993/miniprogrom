import { visit, parse as recastParse, print, types } from 'recast';
import { parse as vueSFCParse, compileScript, compileTemplate, compileStyle } from '@vue/compiler-sfc';
import { readFileSync, writeFileSync, mkdirSync, rmSync, rmdirSync } from 'fs';
import { writeFile, rm, mkdir } from 'fs/promises';
import { isNpmModule, usePathInfo } from './util.js';
import { build as rollupBuild } from './rollup.js';
import { transformSync, transformAsync as babelTransform } from '@babel/core';
import glob from 'glob';
import path from 'path/posix';
import { startTask } from '@yiper.fan/taskbuild';
import { env } from 'process';

console.time('program');
let targetDir = '';
let sourceDir = '';

type PreprocessLang = 'less' | 'sass' | 'scss' | 'styl' | 'stylus';
type fileCollectionType =
    | {
          src: string;
          jsAst: any;
          npm: Set<string>;
          extName: '.js';
      }
    | {
          src: string;
          jsAst: any;
          npm: Set<string>;
          extName: '.vue';
          style: {
              content: string;
              lang: PreprocessLang | undefined;
          };
          template?: {
              content: string;
              lang: string | undefined;
          };
          config?: {
              content: string;
          };
      };

const moduleCollection: Map<string, { ImportNamespaceSpecifier: boolean; ImportDefaultSpecifier: boolean; ImportSpecifier: Set<string> }> = new Map();
const jsCollection: Set<string> = new Set();
const fileCollection: Map<
    string,
    {
        src: string;
        jsAst: any;
        npm: Set<string>;
        extName: '.js';
    }
> = new Map();

// 入口函数
export function main(source: string, target: string) {
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

export function watchVueFile(src: string) {
    // 收集依赖
    collectMap(src);

    if (!singeTransform(src)) {
        const { scriptContent, templateContent, styleContent, configContent } = useVueSFC(src);
        writeVueToMiniProgram(src, scriptContent, templateContent, styleContent, configContent);
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

// 收集依赖
function collectMap(src: string) {
    // 元素置空，从新收集
    fileCollection.delete(src);
    const { dirSrc, extName, fileName } = usePathInfo(src);
    let file = '';

    const collection: string[] = [];

    const collectionData: fileCollectionType = {
        npm: new Set() as Set<string>,
        src,
        jsAst: '',
        extName: '.js',
    };

    if (extName === '.vue') {
        const { scriptContent, templateContent, configContent, style } = useVueSFC(src);
        file = scriptContent;
        Object.assign(collectionData, {
            extName: '.vue',
            style: {
                content: style.content,
                lang: style.lang,
            },
            template: {
                content: templateContent,
                lang: undefined,
            },
            config: {
                content: configContent,
            },
        });
    } else {
        file = useFileContentSync(src);
    }

    const recastAst = recastParse(file);
    // const b = types.builders;

    collectionData.jsAst = recastAst;

    visit(recastAst, {
        visitImportDeclaration(data) {
            const node = data.node;

            if (isNpmModule(String(node.source.value))) {
                const npmName = String(node.source.value);
                // @ts-ignore

                const specifiersData = {
                    ImportNamespaceSpecifier: false,
                    ImportDefaultSpecifier: false,
                    ImportSpecifier: new Set() as Set<string>,
                };

                if (node.specifiers) {
                    for (let index = 0; index < node.specifiers.length; index++) {
                        const element = node.specifiers[index];
                        console.log(element.type);

                        if (element.type == 'ImportNamespaceSpecifier') {
                            specifiersData.ImportNamespaceSpecifier = true;
                            break;
                        }

                        if (element.type == 'ImportDefaultSpecifier') {
                            specifiersData.ImportDefaultSpecifier = true;
                            break;
                        }

                        if (element.type == 'ImportSpecifier') {
                            specifiersData.ImportSpecifier.add(element.imported.name);
                        }
                    }
                }

                // 收集某个npm 导入了哪些方法
                npmCollectionFunction(npmName, specifiersData);

                // collectionData.relativeUrl = path.relative(dirSrc, path.join(sourceDir, 'rollup_modules'));
                collectionData.npm.add(npmName);
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

    fileCollection.set(src, collectionData);

    collection.forEach((item) => {
        //  循环搜集依赖
        collectMap(item);
    });
}

type specifiersType = {
    ImportNamespaceSpecifier: boolean;
    ImportDefaultSpecifier: boolean;
    ImportSpecifier: Set<string>;
};

// 收集npm使用了哪些方法
function npmCollectionFunction(npmName: string, specifiers: specifiersType) {
    if (moduleCollection.get(npmName)) {
        const module = moduleCollection.get(npmName);

        if (specifiers?.ImportDefaultSpecifier || specifiers?.ImportNamespaceSpecifier) {
            module!.ImportDefaultSpecifier = true;
            module!.ImportNamespaceSpecifier = true;
            return;
        }

        const set = module!.ImportSpecifier;
        specifiers.ImportSpecifier.forEach((item) => set.add(item));
    } else {
        // const newSet: Set<string> = new Set();
        // specifiers.ImportSpecifier.forEach((item) => newSet.add(item));
        // specifiers.ImportSpecifier = newSet;
        moduleCollection.set(npmName, specifiers);
    }
}

/**
 * 转换代码为es5并写入miniprogram
 * @param {path} src 文件path
 * @param {string} [content] 文件内容，
 */
export async function writeJsToMiniProgram(src: string, content?: string) {
    const file = content || useFileContentSync(src);

    const targetSrc = path.join(targetDir, path.relative(sourceDir, src));
    const targetDirSrc = path.dirname(targetSrc);

    const data = await Promise.all([useEs6toCommonjs(file), mkdir(targetDirSrc, { recursive: true })]);

    writeFile(targetSrc, data[0]?.code || '', { encoding: 'utf-8' }).catch(() => {
        console.log(`${targetSrc} -->写入失败`);
    });

    console.count(`writeJsToMiniProgram-->${src}`);
}

export async function writeVueToMiniProgram(src: string, scriptContent: string, templateContent?: string, styleContent?: string, configContent?: string) {
    console.count(`writeVueToMiniProgram-->${src}`);
    const { dirSrc, fileName } = usePathInfo(src);
    const targetDirSrc = path.join(targetDir, path.relative(sourceDir, dirSrc));

    mkdirSync(targetDirSrc, { recursive: true });

    const data = await Promise.all([useEs6toCommonjs(scriptContent), mkdir(targetDirSrc, { recursive: true })]);

    writeFile(`${targetDirSrc}/${fileName}.js`, data[0]?.code || '', { encoding: 'utf-8' }).catch(() => {
        console.log(`${targetDirSrc}/${fileName}.js -->写入失败`);
    });

    if (templateContent) {
        writeFile(`${targetDirSrc}/${fileName}.wxml`, templateContent, { encoding: 'utf-8' }).catch(() => {
            console.log(`${targetDirSrc}/${fileName}.wxml -->写入失败`);
        });
    }

    if (styleContent) {
        writeFile(`${targetDirSrc}/${fileName}.wxss`, styleContent, { encoding: 'utf-8' }).catch(() => {
            console.log(`${targetDirSrc}/${fileName}.wxss -->写入失败`);
        });
    }

    if (configContent) {
        writeFile(`${targetDirSrc}/${fileName}.json`, configContent, { encoding: 'utf-8' }).catch(() => {
            console.log(`${targetDirSrc}/${fileName}.json -->写入失败`);
        });
    }
}

function transformFiles(fileList: Map<string, fileCollectionType>) {
    fileList.forEach((data, src) => {
        const { dirSrc, fileName } = usePathInfo(src);

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

        if (data.extName == '.js') {
            writeJsToMiniProgram(src, print(ast).code);
        }

        if (data.extName == '.vue') {
            let styleContent = data.style.content;

            if (data.style.lang) {
                styleContent = useCompileStyle({ styleContent: data.style.content, fileName, lang: data.style.lang }).code;
            }

            writeVueToMiniProgram(src, print(ast).code, data.template?.content, styleContent, data.config?.content);
        }
    });
}

function rollupNpm(moduleList: Map<string, specifiersType>) {
    console.log(moduleList);

    moduleList.forEach((val, key) => {
        const b = types.builders;
        let node: any = '';
        if (val.ImportDefaultSpecifier || val.ImportNamespaceSpecifier) {
            node = recastParse(`export *  from 'b'`);
            node.program.body[0].source = b.literal(key);
        } else {
            const specifiers = [...val.ImportSpecifier].map((item) => b.importSpecifier(b.identifier(item)));

            node = recastParse(`export {a} from 'b'`);
            node.program.body[0].specifiers = specifiers;
            node.program.body[0].source = b.literal(key);
        }

        const id = `./rollupTmp-${Math.ceil(Math.random() * 10000)}.js`;
        writeFile(id, print(node).code).then(() => {
            rollupBuild(id, key, targetDir).then((url) => {
                // rmSync(id);
                rm(id).then(() => {});
            });
        });

        console.count(`rollupNpm-->${key}`);
    });
}

function useVueSFC(src: string) {
    const { fileName } = usePathInfo(src);
    const file = useFileContentSync(src);
    const result = vueSFCParse(file);
    const template = result.descriptor.template;
    const templateContent = template?.content || '';
    const style = result.descriptor.styles[0];
    let styleContent = style?.content;
    // const script = compileScript(result.descriptor, { refTransform: false, id: fileName });
    const scriptContent = result.descriptor.script?.content || '';
    const configContent = result.descriptor.customBlocks[0]?.content || '';

    return {
        templateContent,
        styleContent,
        scriptContent,
        configContent,
        style,
    };
}

function useCompileStyle({ styleContent, fileName, lang }: { styleContent: string; fileName: string; lang: PreprocessLang }) {
    return compileStyle({ source: styleContent, filename: fileName, id: fileName, preprocessLang: lang });
}

function useFileContentSync(src: string) {
    console.count(`useFileContentSync-->${src}`);
    try {
        return readFileSync(src, { encoding: 'utf-8' });
    } catch (error) {
        console.log(`${src}读取失败`);
        return '';
    }
}

export async function useEs6toCommonjs(content: string) {
    return babelTransform(content, { plugins: ['@babel/plugin-transform-modules-commonjs'], code: true });
}

if (env.NODE_ENV === 'development') {
    main('test-src', 'miniprogram');
}
