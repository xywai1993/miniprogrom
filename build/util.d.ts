/**
 * 利用require.resolve来判断一个地址是否为模块
 * @param id
 * @returns
 */
export declare function isNpmModule(id: string): boolean;
export declare function usePathInfo(src: string): {
    dirSrc: string;
    fileName: string;
    extName: string;
};
export declare function usePathToPosix(winPath: string): string;
export declare function intersection<T>(setA: Set<T>, setB: Set<T>): Set<unknown>;
