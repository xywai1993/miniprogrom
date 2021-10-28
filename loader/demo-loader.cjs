const { parse: vueSFCParse, compileScript } = require('@vue/compiler-sfc');
const { dir } = require('console');
const path = require('path/posix');
const qs = require('querystring');
const loaderUtils = require('loader-utils');

// const result = vueSFCParse(file);
// const template = result.descriptor.template;
// const templateContent = template?.content || '';
// const style = result.descriptor.styles[0];
// let styleContent = style?.content;
// // const script = compileScript(result.descriptor, { refTransform: false, id: fileName });
// const scriptContent = result.descriptor.script?.content || '';
// const configContent = result.descriptor.customBlocks[0]?.content || '';

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

function assemble(sourcePath, descriptor) {
    const templateImport = descriptor.template ? `import { render, staticRenderFns } from '${sourcePath}?template'` : ``;

    const scriptImport = descriptor.script ? `import script from '${sourcePath}?script'` : `const script = {}`;

    const styleImports = descriptor.styles
        .map((_, i) => {
            return `import style${i} from '${sourcePath}?vue&style&index=${i}'`;
        })
        .join('\n');

    return `

  ${styleImports}
  script.render = render
  script.staticRenderFns = staticRenderFns
  export default script
  `.trim();
}

module.exports = function (content) {
    // console.log(this.resourcePath);
    const { _compiler, resource, resourcePath, request, resourceQuery, target, minimize, sourceMap, context, rootContext } = this;
    const { dirSrc, fileName } = usePathInfo(resourcePath);
    const stringifyRequest = (r) => loaderUtils.stringifyRequest(this, r);
    const rootPath = path.join(__dirname, 'test-src');

    // if (fileName !== 'App') {
    //     console.log(path.join(dirSrc, 'main.json'));
    //     this.addDependency(path.join(dirSrc, 'main.json'));
    // }

    console.log({ resourceQuery, 'demo-loader': 1, content });

    const result = vueSFCParse(content);
    const descriptor = result.descriptor;
    const scriptContent = result.descriptor.script?.content;
    const styleContent = result.descriptor.styles[0].content;

    const basePathContext = context.replace(rootPath, '');

    if (resourceQuery) {
        return styleContent;
    }
    // console.log({ context, rootContext, resourcePath, resource, basePathContext });
    // console.log(scriptContent);
    // this.emitFile('app.js', scriptContent);
    // this.emitFile(path.join(dirSrc, 'main.wxss'), styleContent);

    // if (fileName !== 'App') {
    //     this.emitFile(path.join(basePathContext, 'main.wxss'), styleContent);
    // } else {
    //     this.emitFile(path.join(basePathContext, 'app.wxss'), styleContent);
    // }

    // if (resourceQuery) {
    //     const query = qs.parse(resourceQuery.slice(1));
    //     // template
    //     if (query.template != null) {
    //         // return compileTemplate(descriptor, this, moduleId);
    //         return '';
    //     }
    //     // script
    //     if (query.script != null) {
    //         this.callback(null, descriptor.script.content, descriptor.script.map);
    //         return;
    //     }
    //     // styles
    //     if (query.style != null && query.index != null) {
    //         return descriptor.styles[query.index].content;
    //     }
    // }
    return assemble(resourcePath, result.descriptor);
};
