const { html2json, json2html } = require('html2json');
const compiler = require('vue-template-compiler');
const { parse: vueSFCParse, compileScript, compileTemplate, transformRef } = require('@vue/compiler-sfc');

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
    if (blockList.indexOf(tagName) !== -1) {
        return 'view';
    }
    return tagName;
}

const template = `<div @click="change" v-show="abc"  a='a' b='b' c=3><p v-for="(li,index) in list1" :key="li.id">{{li.id}}</p></div>`;

function t(children) {
    return children.map((item) => {
        console.log(item);
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

            // eg:  li.id to id  wx:key={{id}}
            if (item.key) {
                var re = new RegExp(`^${item.alias}\.`);
                o.attr['wx:key'] = `{{${item.key.replace(re, '')}}}`;
            }
        }

        if (item.attrs) {
            item.attrs.forEach((attr) => {
                // todo: 这里将来可能会有bug 强制去掉了双引号
                o.attr[attr.name] = attr.value.replace(/\"/g, '');
            });
        }

        if (item.directives) {
            item.directives.forEach((directives) => {
                if (directives.rawName == 'v-show') {
                    o.attr['hidden'] = `{{${directives.value}}}`;
                }
            });
        }

        if (item.events) {
            // for (key of item.events) {
            //     console.log(key);
            // }

            Object.entries(item.events).forEach((key, val) => {
                console.log(key);
                if (key[0] == 'click') {
                    o.attr['bind:tap'] = key[1].value;
                }
            });
        }

        if (item.children) {
            o.child = t(item.children);
        }
        return o;
    });
}

// console.log(html2json(template));

const r = template2WxTemplate(template);
console.log(r);
function template2WxTemplate(template) {
    const result = compiler.compile(template, {});
    return json2html({ node: 'root', child: t([result.ast]) });
}

module.exports = template2WxTemplate;
