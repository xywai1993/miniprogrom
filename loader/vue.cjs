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

function removeQuote(str, single = false) {
    return single ? str.replace(/\'/g, '') : str.replace(/\"/g, '');
}

// const template = `<div class="body {{some?'a':'b'}}" :class="{a:some}"  @click="change" v-show="abc"   c=3><p v-for="(li,index) in list1" :key="li.id">{{li.id}}</p></div>`;

const template = `
<div class="body">
       <mp-navigation-bar :ext-class="'nav-bar'" :background="bgColor" :title="title" :back="false" color="#FFF">
            <view slot="left" v-show="!title">
                <input type="text" class="top-search" placeholder="2021年待产包清单" @confirm="confirm" @blur="searchBlur" />
            </view>
        </mp-navigation-bar>
        <div class="g-flex-center header">
            <input type="text" v-show="title" class="search" placeholder="2021年待产包清单" />
        </div>

        <div v-for="(li, index) in list1">{{ li.material_id }}</div>
        <div class="grid">
            <view>
                <ul class="list-wrap">
                    <li wx:for="{{list1}}" wx:key="material_id" class="item">
                        <list-tag tagData="{{item}}"></list-tag>
                    </li>
                </ul>
            </view>

            <view>
                <ul class="list-wrap">
                    <li wx:for="{{list2}}" wx:key="material_id" class="item">
                        <list-tag tagData="{{item}}"></list-tag>
                    </li>
                </ul>
            </view>
        </div>

        <nav-nav hover="a"></nav-nav>
    </div>
`;

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

            // eg:  li.id to id  wx:key={{id}}
            if (item.key) {
                var re = new RegExp(`^${item.alias}\.`);
                o.attr['wx:key'] = `${item.key.replace(re, '')}`;
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

            Object.entries(item.events).forEach((key) => {
                if (key[0] == 'click') {
                    o.attr['bind:tap'] = key[1].value;
                } else {
                    o.attr[`bind:${key[0]}`] = key[1].value;
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
            // '{a:some}' 转换为 [{a:some}]

            const classArr = removeQuote(item.classBinding, true).replace(/{|}/g, '').split(',');
            classArr.forEach((str) => {
                const val = str.split(':');
                const c = `{{${val[1]}?${val[0]}:null}}`;
                if (o.attr.class) {
                    o.attr.class.push(c);
                } else {
                    o.attr['class'] = [c];
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
