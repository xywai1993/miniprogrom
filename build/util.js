import { createRequire } from 'module';
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
