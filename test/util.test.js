import { usePathToPosix, usePathInfo } from '../build/util.js';
import { jest } from '@jest/globals';
import { platform } from 'os';

test('usePathInfo is ok', () => {
    const { dirSrc, fileName, extName } = usePathInfo('/src/pages/test.js');
    expect(dirSrc).toBe('/src/pages');
    expect(fileName).toBe('test');
    expect(extName).toBe('.js');
    if (platform() == 'win32') {
        expect(usePathInfo('\\src\\index.vue').dirSrc).toBe('/src');
    }
});

test('usePathToPosix is ok', () => {
    expect(usePathToPosix('src')).toBe('src');
    expect(usePathToPosix('/src')).toBe('/src');
    expect(usePathToPosix('/src/')).toBe('/src/');
    expect(usePathToPosix('/src/test')).toBe('/src/test');
    if (platform() == 'win32') {
        expect(usePathToPosix('src\\test')).toBe('src/test');
        expect(usePathToPosix('\\src\\test')).toBe('/src/test');
        expect(usePathToPosix('\\src\\test\\')).toBe('/src/test/');
    }
});
