import { usePathToPosix } from '../build/util.js';
import { jest } from '@jest/globals';

test('usePathToPosix', () => {
    expect(usePathToPosix('src')).toBe('src');
    expect(usePathToPosix('/src')).toBe('/src');
    expect(usePathToPosix('/src/')).toBe('/src/');
    expect(usePathToPosix('/src/test')).toBe('/src/test');
    expect(usePathToPosix('src\\test')).toBe('src/test');
    expect(usePathToPosix('\\src\\test')).toBe('/src/test');
    expect(usePathToPosix('\\src\\test\\')).toBe('/src/test/');
});
