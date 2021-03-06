import { createRequire } from 'module';
import path from 'path/posix';
import { sep } from 'path';
import { platform } from 'os';
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
    src = usePathToPosix(src);
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
    if (platform() === 'win32') {
        return winPath.split(sep).join('/');
    }
    else {
        return winPath;
    }
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
