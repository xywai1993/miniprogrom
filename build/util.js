import { createRequire } from 'module';
import path from 'path/posix';
import { sep } from 'path';
/**
 * 利用require.resolve来判断一个地址是否为模块
 * @param id
 * @returns
 */
export function isNpmModule(id) {
    const require = createRequire(import.meta.url);
    try {
        require.resolve(id);
        return true;
    }
    catch (error) {
        return false;
    }
}
export function usePathInfo(src) {
    const dirSrc = path.dirname(src);
    const extName = path.extname(src);
    const fileName = path.basename(src, extName);
    return {
        dirSrc,
        fileName,
        extName,
    };
}
export function usePathToPosix(winPath) {
    return winPath.split(sep).join('/');
}
// 交集
export function intersection(setA, setB) {
    let _intersection = new Set();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}
