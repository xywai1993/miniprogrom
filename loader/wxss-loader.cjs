const path = require('path');

function usePathInfo(src) {
    const dirSrc = path.dirname(src);
    const extName = path.extname(src);
    const fileName = path.basename(src, extName);

    return {
        dirSrc,
        fileName,
        extName,
    };
}
module.exports = function (content) {
    const { _compiler, resource, resourcePath, request, resourceQuery, target, minimize, sourceMap, context, rootContext } = this;
    const { dirSrc, fileName } = usePathInfo(resourcePath);
    const rootPath = path.join(rootContext, 'test-src');
    const basePathContext = context.replace(rootPath, '');
    console.log({ basePathContext });
    this.emitFile(path.join(basePathContext, fileName + '.wxss'), content);
    return `export default ''`;
};
