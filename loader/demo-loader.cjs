const { parse: vueSFCParse, compileScript } = require('@vue/compiler-sfc');
const { dir } = require('console');
const path = require('path/posix');
const qs = require('querystring');
const loaderUtils = require('loader-utils');
const { URL } = require('url');

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
    console.log('执行几次呢');
    // console.log(this.resourcePath);
    const { _compiler, resource, resourcePath, request, resourceQuery, target, minimize, sourceMap, context, rootContext, query } = this;
    const { dirSrc, fileName } = usePathInfo(resourcePath);
    const stringifyRequest = (r) => loaderUtils.stringifyRequest(this, r);
    const rootPath = path.join(__dirname, 'test-src');
    const basePathContext = context.replace(rootPath, '');

    console.log({ resourceQuery, query, 'demo-loader': 1 });

    const result = vueSFCParse(content);
    const descriptor = result.descriptor;
    const scriptContent = result.descriptor.script?.content;
    const styleContent = result.descriptor.styles[0].content;
    const templateContent = descriptor.template.content;

    const url = new URL(resourceQuery, 'http://test.com');

    console.log(url.searchParams.has('vue'), url.searchParams.has('style'));
    if (url.searchParams.has('vue') && url.searchParams.has('style')) {
        return styleContent;
    }

    if (url.searchParams.has('vue') && url.searchParams.has('template')) {
        return templateContent;
    }

    const templateImport = descriptor.template ? `import template from 'wxml-loader!${resourcePath}?vue&template'` : ``;

    const styleImports = descriptor.styles
        .map((_, i) => {
            return `import style${i} from 'wxss-loader?root=${query.root}!less-loader!${resourcePath}?vue&style&index=${i}'`;
        })
        .join('\n');

    let code = `
        ${templateImport}
        ${styleImports}
        ${descriptor.script.content}
        `;

    // console.log({ code });
    return code;
};
