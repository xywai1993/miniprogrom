import { visit, parse, run, print, types } from 'recast';
import { parse as vueParse } from '@vue/compiler-sfc';
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { build as rollupBuild } from './build/rollup.js';

const require = createRequire(import.meta.url);
const code = readFileSync('./src/pages/main.vue', { encoding: 'utf-8' });

const result = vueParse(code);

const ast = parse(result.descriptor.script?.content || '');

const b = types.builders;
let promise = null;
visit(ast, {
    visitImportDeclaration(path) {
        const node = path.node;
        const parentPath = path.parentPath;

        console.log({ path, node });
        // node.source.value = './c';
        // console.log(node.specifiers);
        // node.specifiers.push(b.importSpecifier(b.identifier('s')));
        // path.replace(node);

        try {
            const id = require.resolve(node.source.value);
            console.log(id);

            // const createRollFile = b.program([node]);
            node.type = 'ExportNamedDeclaration';
            // node.source.value = './bundle.js';
            // node.specifiers = node.specifiers.map((item) => (item.type = 'ExportSpecifier'));
            writeFileSync('./rollupTmp.js', print(node).code);
            promise = rollupBuild()
                .then(() => {
                    node.source.value = './bundle.js';
                    writeFileSync('./rollupTmp.js', print(node).code);
                })
                .catch(console.log);
        } catch (error) {
            // 非npm模块
            // console.log(error, node.source.value);
        }
        return false;
    },
});

promise.then(() => {
    console.log(print(ast).code);
});
