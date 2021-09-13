import { visit, parse, run, print, types } from 'recast';
import { parse as vueParse } from '@vue/compiler-sfc';
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const code = readFileSync('./src/pages/main.vue', { encoding: 'utf-8' });

const result = vueParse(code);

const ast = parse(result.descriptor.script?.content || '');
console.log(ast.program.body[0]);
const b = types.builders;

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
            // node.specifiers = node.specifiers.map((item) => (item.type = 'ExportSpecifier'));
            writeFileSync('./test.js', print(node).code);
        } catch (error) {
            // console.log(error, node.source.value);
        }
        return false;
    },
});
