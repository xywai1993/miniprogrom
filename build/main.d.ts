export declare function main(source: string, target: string): void;
export declare function watchVueFile(src: string): void;
export declare function watchJsFile(src: string): void;
/**
 * 转换代码为es5并写入miniprogram
 * @param {path} src 文件path
 * @param {string} [content] 文件内容，
 */
export declare function writeJsToMiniProgram(src: string, content?: string): Promise<void>;
export declare function writeVueToMiniProgram(src: string, scriptContent: string, templateContent?: string, styleContent?: string, configContent?: string): Promise<void>;
export declare function useEs6toCommonjs(content: string): Promise<import("@babel/core").BabelFileResult | null>;
