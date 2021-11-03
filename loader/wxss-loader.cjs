const path = require('path');
const { URL } = require('url');
const postcss = require('postcss');
const postUrl = require('postcss-url');

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
    const { _compiler, resource, resourcePath, request, resourceQuery, target, minimize, sourceMap, context, rootContext, query, importModule, loadModule } =
        this;
    const url = new URL(query, 'http://demo.com');
    this.callback(null, `export default ''`);
    const { dirSrc, fileName } = usePathInfo(resourcePath);
    const rootPath = path.join(rootContext, url.searchParams.get('root'));
    const basePathContext = context.replace(rootPath, '');
    this.emitFile(path.join(basePathContext, fileName + '.wxss'), content);
    // const callback = this.async();
    const output = postcss()
        .use(
            postUrl({
                url: async (asset) => {
                    // const code = `${path.join(dirSrc, asset.url + '?asset-resource')}`;
                    const data = await importModule(asset.url + '?asset-resource', { publicPath: dirSrc });
                    // loadModule(code, (err, source, sourceMap, module) => {
                    //     console.log(module);
                    // });

                    // this.resolve(dirSrc, `${asset.url}?asset-resource`, (err, result) => {
                    //     console.log(err, result);
                    // });

                    // return path.join('http://cdn.com', asset.url);
                    return `new URL(asset.url, import.meta.url)`;
                },
            })
        )
        .process(content)
        .then((result) => {
            // console.log(result.css);
            // callback(null, result.css);
        });
    // .process(css, {
    //     from: 'src/stylesheet/index.css',
    //     to: 'dist/index.css',
    // });

    // return `export default ''`;
    // const callback = this.async();
    // callback(null, `export default ''`);
};
