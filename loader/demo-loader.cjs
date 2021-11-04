const { parse: vueSFCParse, compileScript } = require('@vue/compiler-sfc');
const path = require('path/posix');
const qs = require('querystring');
const loaderUtils = require('loader-utils');
const { URL } = require('url');
const { readFileSync } = require('fs');

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

module.exports = function (content, map, meta) {
    const { _compiler, resource, resourcePath, request, resourceQuery, target, minimize, sourceMap, context, rootContext, query } = this;
    const { dirSrc, fileName, extName } = usePathInfo(resourcePath);
    const stringifyRequest = (r) => loaderUtils.stringifyRequest(this, r);
    const rootPath = path.join(rootContext, query.root);
    const basePathContext = context.replace(rootPath, '');

    const content2 = readFileSync(path.join(dirSrc, fileName + extName), { encoding: 'utf-8' });
    const result = vueSFCParse(content2);
    const descriptor = result.descriptor;
    const scriptContent = result.descriptor.script?.content;
    const styleContent = result.descriptor.styles[0].content;
    const templateContent = descriptor.template.content;

    const url = new URL(resourceQuery, 'http://test.com');

    if (url.searchParams.has('css')) {
        console.log({ css: 2, content });
        return styleContent;
    }

    if (url.searchParams.has('template')) {
        console.log({ template: 1, content, templateContent });
        return templateContent;
    }

    if (result.descriptor.customBlocks.length) {
        result.descriptor.customBlocks.forEach((item) => {
            if (item.type === 'config') {
                this.emitFile(path.join(basePathContext, fileName + '.json'), item.content);
            }
        });
    }

    const templateImport = descriptor.template ? `import template from '${resourcePath}?template'` : ``;

    const styleImports = descriptor.styles
        .map((_, i) => {
            return `import style${i} from '${resourcePath}?css'`;
        })
        .join('\n');

    let code = `
        ${templateImport}
        ${styleImports}
        ${descriptor.script.content}
        `;

    this.callback(null, code, null, content);
    // return code;
};

module.exports.pitch = function (a, b, c) {
    // console.log({ a, b, c }, /\.vue$/.test(a));

    if (/\.vue$/.test(a)) {
        const content = readFileSync(a, { encoding: 'utf-8' });

        const result = vueSFCParse(content);
        const descriptor = result.descriptor;
        const scriptContent = result.descriptor.script?.content;
        const styleContent = result.descriptor.styles[0].content;
        const templateContent = descriptor.template.content;

        const templateImport = descriptor.template ? `import template from '${a}?template'` : ``;

        const styleImports = descriptor.styles
            .map((_, i) => {
                return `import style${i} from '${a}?css'`;
            })
            .join('\n');

        let code = `
        ${templateImport}
        ${styleImports}
        ${descriptor.script.content}
        `;

        return code;
    }
};
