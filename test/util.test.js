import { usePathToPosix, usePathInfo } from '../build/util.js';
import { jest } from '@jest/globals';

test('usePathInfo is ok', () => {
    const { dirSrc, fileName, extName } = usePathInfo('/src/pages/test.js');
    expect(dirSrc).toBe('/src/pages');
    expect(fileName).toBe('test');
    expect(extName).toBe('.js');
    expect(usePathInfo('\\src\\index.vue').dirSrc).toBe('/src');
});

test('usePathToPosix is ok', () => {
    expect(usePathToPosix('src')).toBe('src');
    expect(usePathToPosix('/src')).toBe('/src');
    expect(usePathToPosix('/src/')).toBe('/src/');
    expect(usePathToPosix('/src/test')).toBe('/src/test');
    expect(usePathToPosix('src\\test')).toBe('src/test');
    expect(usePathToPosix('\\src\\test')).toBe('/src/test');
    expect(usePathToPosix('\\src\\test\\')).toBe('/src/test/');
});
