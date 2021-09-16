import { createRequire } from 'module';
import path from 'path/posix';

/**
 * 利用require.resolve来判断一个地址是否为模块
 * @param id
 * @returns
 */
export function isNpmModule(id: string) {
    const require = createRequire(import.meta.url);
    try {
        require.resolve(id);
        return true;
    } catch (error) {
        return false;
    }
}

export function usePathInfo(src: string) {
    const dirSrc = path.dirname(src);
    const extName = path.extname(src);
    const fileName = path.basename(src, extName);

    return {
        dirSrc,
        fileName,
        extName,
    };
}
