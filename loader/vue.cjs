const { html2json, json2html } = require('html2json');
const compiler = require('vue-template-compiler');
const { visit, parse: recastParse, print, types } = require('recast');
// const { parse: vueSFCParse, compileScript, compileTemplate, transformRef, generateCodeFrame } = require('@vue/compiler-sfc');
// const { createRenderer, defineComponent, createElementVNode, h, createBlock, ref } = require('vue');
// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;


/**
 *{
  node: 'root',
  child: [
    {
      node: 'element',
      tag: 'div',
      attr: { id: '1', class: 'foo' },
      child: [
        {
          node: 'element',
          tag: 'h2',
          child: [
            { node: 'text', text: 'sample text with ' },
            { node: 'element', tag: 'code', child: [{ node: 'text', text: 'inline tag' }] }
          ]
        },
        {
          node: 'element',
          tag: 'pre',
          attr: { id: 'demo', class: ['foo', 'bar'] },
          child: [{ node: 'text', text: 'foo' }]
        },
        {
          node: 'element',
          tag: 'pre',
          attr: { id: 'output', class: 'goo' },
          child: [{ node: 'text', text: 'goo' }]
        },
        {
          node: 'element',
          tag: 'input',
          attr: { id: 'execute', type: 'button', value: 'execute' }
        }
      ]
    }
  ]
}
 */

function changeElementName(tagName) {
    const blockList = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'li'];
    const inlineList = ['span', 'i', 'em'];
    if (blockList.indexOf(tagName) !== -1) {
        return 'view';
    }
    if (inlineList.indexOf(tagName) !== -1) {
        return 'text';
    }
    if (tagName === 'img') {
        return 'image'
    }
    return tagName;
}

/**
 * 
 * @param bindStyle {string}  类似这样的 "{'width':some+'px',height:some2}"
 * @returns {string}
 */
function changeBindStyle(bindStyle){
    const ast = recastParse(`const test = ${bindStyle}`).program.body[0].declarations[0].init.properties;
    let styleStr = '';

    ast.forEach(style => {
        const value = style.value;
        const key = style.key.type === 'Identifier'? style.key.name :'style.key.value';
        if (value.type == 'BinaryExpression') {
            let left = '';
            let right = ''
            if (value.left.type === 'Identifier') {
                left = value.left.name
            }
            if (value.left.type === 'Literal') {
                left = value.left.raw;
            }

            if (value.right.type === 'Identifier') {
                right = value.right.name
            }
            if (value.right.type === 'Literal') {
                right = value.right.raw;
            }
            styleStr += `;${key}:{{${left}${value.operator}${right}}}`
        }

        if (value.type == 'Identifier') {
            styleStr += `;${key}:{{${value.name}}}`
        }
    })

    return styleStr;
}

function removeQuote(str, single = false) {
    return single ? str.replace(/\'/g, '') : str.replace(/\"/g, '');
}



function t(children) {
    return children.map((item) => {
        const o = { node: '', type: 1, tag: '', text: '', attr: {}, child: [] };
        o.tag = item.tag;
        o.type = item.type;

        if (item.type == 1) {
            o.node = 'element';
            o.tag = changeElementName(item.tag);
        }

        if (item.type == 2) {
            o.node = 'text';
            o.text = item.text;
        }

        if (item.type == 3) {
            o.node = 'text';
            o.text = item.text;
        }

        if (item.if) {
            o.attr['wx:if'] = `{{${item.if}}}`;
        }

        if (item.for) {
            o.attr['wx:for'] = `{{${item.for}}}`;
            // wx:for-item="i"
            o.attr['wx:for-item'] = `${item.alias}`;

            if (item.iterator1) {
                o.attr['wx:for-index'] = `${item.iterator1}`;
            } else {
                o.attr['wx:for-index'] = `index`;
            }

            // eg:  li.id to id  wx:key="id"
            if (item.key) {
                var re = new RegExp(`^${item.alias}\.`);
                o.attr['wx:key'] = `${item.key.replace(re, '')}`;
            }
        }

        if (item.attrs) {
            item.attrs.forEach((attr, i) => {
                // todo: 这里将来可能会有bug 强制去掉了双引号

                const name = item.attrs[i].name;
                if (attr.dynamic === false) {
                    // o.attr[name] = attr.value.replace(/\"/g, '');
                    o.attr[name] = `{{${attr.value}}}`
                } else {
                    // o.attr[name] = `${attr.value}`
                    o.attr[name] = attr.value.replace(/\"/g, '');
                }
                // o.attr[attr.name] = attr.value.replace(/\"/g, '');
            });
        }

        if (item.directives) {
            item.directives.forEach((directives) => {
                if (directives.rawName == 'v-show') {
                    o.attr['hidden'] = `{{${!directives.value}}}`;
                }
            });
        }

        if (item.events) {


            Object.entries(item.events).forEach((key) => {
                const wxEventName = key[0] == 'click' ? 'bind:tap' : `bind:${key[0]}`;

                // todo: 检测函数名是否存在参数 eg: fn() 或者 fn
                if (key[1].value.indexOf('(') !== -1) {

                    const ast = recastParse(key[1].value).program.body[0];
                    const arguments = [];

                    const fnName = ast.expression.callee.name;
                    ast.expression.arguments.forEach(item => {
                        if (item.type === 'MemberExpression') {
                            arguments.push(`{{${item.object.name}.${item.property.name}}}`)
                        }
                        if (item.type === 'Identifier') {
                            arguments.push(`{{${item.name}}}`)
                        }
                        if (item.type === 'Literal') {
                           
                            arguments.push(item.raw)
                        }
                    })

                  

                    o.attr[wxEventName] = fnName;
                    o.attr['data-event-params'] = `${arguments}`

                } else {
                    o.attr[wxEventName] = key[1].value;
                }

            });
        }

        if (item.staticClass) {
            if (o.attr.class) {
                o.attr.class.push(item.staticClass);
            } else {
                o.attr['class'] = [removeQuote(item.staticClass)];
            }
        }

        if (item.classBinding) {

            // '{a:some}' 转换为 [a:some]
            const classArr = item.classBinding.replace(/{|}/g, '').split(',');
            classArr.forEach((str) => {
                const val = str.split(':');
                let css = `'${removeQuote(removeQuote(val[0], true))}'`;

                const c = `{{${val[1]}?${css}:null}}`;
                if (o.attr.class) {
                    o.attr.class.push(c);
                } else {
                    o.attr['class'] = [c];
                }
            });
        }

        if (item.staticStyle) {
            // const ast = recastParse(removeQuote(item.staticStyle)).program.body[0];
            let styleStr = item.attrsMap.style;

            if (o.attr.style) {
                o.attr.style += styleStr;
            } else {
                o.attr['style'] = styleStr;
            }

           
        }

        if (item.styleBinding) {

            
            const styleStr = changeBindStyle(item.styleBinding);

            if (o.attr.style) {
                o.attr.style += styleStr;
            } else {
                o.attr['style'] = styleStr;
            }

            

            console.log(o.attr['style']);


        }

        if (item.children) {
            o.child = t(item.children);
        }
        return o;
    });
}

// console.log(html2json(template));
console.log(html2json(`<img style="color:red;"  src="https://baidu.com" />`).child);
const template = `
<img style="color:red;" :style="{width:some+'px',height:some2}"  src="https://baidu.com" />
`;
const r = template2WxTemplate(template);
console.log(r);
function template2WxTemplate(template) {
    const result = compiler.compile(template, {});
    return json2html({ node: 'root', child: t([result.ast]) });
}

module.exports = template2WxTemplate;
