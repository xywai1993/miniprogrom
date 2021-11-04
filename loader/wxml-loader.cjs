const path = require('path');
const { html2json, json2html } = require('html2json');
const compiler = require('vue-template-compiler');
const { parse: vueSFCParse, compileScript } = require('@vue/compiler-sfc');

const result = compiler.compile('<div @click="hello" > <p>22</p> </div>', {
    directives: {
        test(node, directiveMeta) {
            // transform node based on directiveMeta
            // console.log({ node, directiveMeta });
            node.tag = 'h1';
            return node;
        },
    },
});

/**
 * 
 * @param ast 
 * {
    type: 1,
    tag: 'div',
    attrsList: [ [Object] ],
    attrsMap: { '@click': 'hello' },
    rawAttrsMap: {},
    parent: undefined,
    children: [ [Object] ],
    plain: false,
    hasBindings: true,
    events: { click: [Object] },
    static: false,
    staticRoot: false
  }
 */
function astToTemplate(ast) {
    if (ast.type === 1) {
        ``;
    }
}

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
    const list = ['div', 'h1', 'p', 'ul', 'li'];

    return nodeChild.map((item) => {
        if (item.node == 'element') {
            if (item.attr) {
                item.attr = changeAttr(item.attr);
            }

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

function changeAttr(object) {
    if (object.hasOwnProperty('v-if')) {
        object['wx:if'] = `{{${object['v-if']}}}`;
    }

    if (object.hasOwnProperty('v-on:click')) {
        object['bind:tap'] = `${object['v-on:click']}`;
    }
    return object;
}

module.exports = function (content) {
    const { _compiler, resource, resourcePath, request, resourceQuery, target, minimize, sourceMap, context, rootContext, query } = this;

    // this.callback(null, `export default ''`);
    const { dirSrc, fileName } = usePathInfo(resourcePath);
    const rootPath = path.join(rootContext, 'test-src');
    const basePathContext = context.replace(rootPath, '');

    // let templateJson = html2json(content);

    // templateJson.child = transformTmp(templateJson.child);

    // // const callback = this.async();

    const result = vueSFCParse(content);
    const descriptor = result.descriptor;
    const templateContent = descriptor.template.content;
    let templateJson = html2json(templateContent);
    templateJson.child = transformTmp(templateJson.child);

    if (result.descriptor.customBlocks.length) {
        result.descriptor.customBlocks.forEach((item) => {
            if (item.type === 'config') {
                this.emitFile(path.join(basePathContext, fileName + '.json'), item.content);
            }
        });
    }

    this.emitFile(path.join(basePathContext, fileName + '.wxml'), json2html(templateJson));
    return '';
};
