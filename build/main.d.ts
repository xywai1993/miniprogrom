export declare const targetDir = "miniprogram";
export declare const sourceDir = "test-src";
export declare function watchVueFile(src: string): void;
export declare function watchJsFile(src: string): void;
/**
 * 转换代码为es5并写入miniprogram
 * @param {path} src 文件path
 * @param {string} [content] 文件内容，
 */
export declare function writeJsToMiniProgram(src: string, content?: string): void;
export declare function writeVueToMiniProgram(src: string, scriptContent: string, templateContent: string, styleContent: string): void;
