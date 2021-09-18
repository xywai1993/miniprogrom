import watch from 'node-watch';
import path from 'path';
import { watchVueFile, watchJsFile, main } from './main.js';
import { copyFile } from 'fs/promises';
import { usePathInfo } from './util.js';
import { rmSync } from 'fs';

interface options {
    sourceDir: string;
    targetDir: string;
}

export function watchSourceAndBuild({ sourceDir, targetDir }: options) {
    rmSync(targetDir, { force: true, recursive: true });

    main(sourceDir, targetDir);

    watch(sourceDir, { recursive: true }, function (evt, src) {
        if (!src) {
            return;
        }
        const { fileName, dirSrc, extName } = usePathInfo(src);
        console.log(` changed success : ${src}  fileName:${fileName} extName: ${extName} `);
        if (extName == '.vue') {
            watchVueFile(src);
        } else if (extName == '.js') {
            watchJsFile(src);
        } else {
            const targetSrc = path.join(targetDir, path.relative(sourceDir, src));
            copyFile(src, targetSrc).then(() => {
                console.log(`copyFile success : ${src}--->${targetSrc}`);
            });
        }
    });
}

watchSourceAndBuild({ sourceDir: 'test-src', targetDir: 'miniprogram' });
