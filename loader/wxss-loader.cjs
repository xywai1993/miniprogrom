const path = require('path');
const { URL } = require('url');
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
    const { _compiler, resource, resourcePath, request, resourceQuery, target, minimize, sourceMap, context, rootContext, query } = this;
    const url = new URL(query, 'http://demo.com');

    const { dirSrc, fileName } = usePathInfo(resourcePath);
    const rootPath = path.join(rootContext, url.searchParams.get('root'));
    const basePathContext = context.replace(rootPath, '');
    console.log({ wxss: true, basePathContext });
    this.emitFile(path.join(basePathContext, fileName + '.wxss'), content);
    return `export default ''`;
    // const callback = this.async();
    // callback(null, `export default ''`);
};
