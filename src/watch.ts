import watch from 'node-watch';
import path from 'path';
import { watchVueFile, watchJsFile } from './main.js';

watch('./src/', { recursive: true }, function (evt, src) {
    if (!src) {
        return;
    }
    const fileName = path.basename(src, '.vue');
    const extName = path.extname(src);
    const dirSrc = path.dirname(src);
    console.log(`${src} changed. fileName:${fileName} extName: ${extName} `);

    if (extName == '.vue') {
        watchVueFile(src);
    }

    if (extName == '.js') {
        // es6toes5(src);
        // writeJsToMiniProgram(src);
        watchJsFile(src);
    }
});
