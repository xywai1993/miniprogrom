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
    if(tagName === 'img'){
        return 'image'
    }
    return tagName;
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
            item.attrs.forEach((attr,i) => {
                // todo: 这里将来可能会有bug 强制去掉了双引号
              
                const name = item.attrs[i].name ;
                if(attr.dynamic === false){
                    // o.attr[name] = attr.value.replace(/\"/g, '');
                    o.attr[name] = `{{${attr.value}}}`
                }else{
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
                    // const re = /\((.+)\)/;
                    // console.log(key, 'true,存在参数');
                    // console.log(key[1].value.match(re));
                    // "choice(li.id,'s')"
                    const ast = recastParse(key[1].value).program.body[0];
                    const arguments = [];
                 
                   const fnName = ast.expression.callee.name ;
                    ast.expression.arguments.forEach(item=>{
                        if(item.type === 'MemberExpression'){
                            arguments.push(`{{${item.object.name}.${item.property.name}}}`)
                        }
                        if(item.type === 'Identifier'){
                            arguments.push(`{{${item.name}}}`)
                        }
                        if(item.type === 'Literal'){
                            console.log({item});
                            arguments.push(item.raw)
                        }
                    })

                    console.log({arguments});

                    o.attr[wxEventName] = fnName ;
                    o.attr['data-event-params'] = `${arguments}`

                }else{
                    o.attr[wxEventName] = key[1].value ;
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

        if (item.styleBinding) {
          
        
            const ast = recastParse(item.styleBinding).program.body[0];          
            let styleStr = '';
            if(ast.type === 'BlockStatement'){
                const body = ast.body[0];

                ast.body.forEach(style=>{
                    // todo: expression 有多种可能
                    // {height: someVar}  type = 'Identifier'
                    // {height: someVar+'px'}  type = 'BinaryExpression'
                    if(style.body.expression.type='Identifier'){
                        styleStr += `;${style.label.name}:{{${style.body.expression.name}}}`
                    }
                   
                })

                if (o.attr.style) {
                        o.attr.class.style += styleStr;
                } else {
                    o.attr['style'] = styleStr;
                }
            }


        }

        if (item.children) {
            o.child = t(item.children);
        }
        return o;
    });
}

// console.log(html2json(template));
console.log(html2json(`<div style="height:30px;"></div>`).child);
const template = `
<img src="https://baidu.com" />
`;
const r = template2WxTemplate(template);
console.log(r);
function template2WxTemplate(template) {
    const result = compiler.compile(template, {});
    return json2html({ node: 'root', child: t([result.ast]) });
}

module.exports = template2WxTemplate;
