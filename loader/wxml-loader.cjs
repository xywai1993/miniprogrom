const path = require('path');
const { html2json, json2html } = require('html2json');

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

function transformTmp(nodeChild) {
    const list = ['div', 'h1', 'p'];

    return nodeChild.map((item) => {
        if (item.node == 'element') {
            if (list.indexOf(item.tag) !== -1) {
                item.tag = 'view';
            }
            if (item.child?.length) {
                item.child = transformTmp(item.child);
            }
        }
        return item;
    });
}

module.exports = function (content) {
    const { _compiler, resource, resourcePath, request, resourceQuery, target, minimize, sourceMap, context, rootContext } = this;
    const { dirSrc, fileName } = usePathInfo(resourcePath);
    const rootPath = path.join(rootContext, 'test-src');
    const basePathContext = context.replace(rootPath, '');

    let templateJson = html2json(content);

    templateJson.child = transformTmp(templateJson.child);

    console.log(templateJson);
    // const callback = this.async();
    this.emitFile(path.join(basePathContext, fileName + '.wxml'), json2html(templateJson));
    // return `export default ''`;
    this.callback(null, `export default ''`);
};
