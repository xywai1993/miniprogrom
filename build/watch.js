// import watch from 'node-watch';
import path from 'path/posix';
import { sep } from 'path';
import { watchVueFile, watchJsFile } from './main.js';
import { copyFile } from 'fs/promises';
import { usePathInfo } from './util.js';
import { env } from 'process';
import watch from 'watch';
export function watchSourceAndBuild({ sourceDir, targetDir }) {
    // rmSync(targetDir, { force: true, recursive: true });
    // main(sourceDir, targetDir);
    // watch(sourceDir, { recursive: true }, function (evt, changeSrc) {
    //     console.log(path.posix.normalize(changeSrc || ''));
    //     if (!changeSrc) {
    //         return;
    //     }
    //     const src = path.posix.normalize(changeSrc || '');
    //     const { fileName, dirSrc, extName } = usePathInfo(src);
    //     console.log(`${src} has been changed success :    extName: ${extName} `);
    //     if (extName == '.vue') {
    //         watchVueFile(src);
    //     } else if (extName == '.js') {
    //         watchJsFile(src);
    //     } else {
    //         const targetSrc = path.join(targetDir, path.relative(sourceDir, src));
    //         copyFile(src, targetSrc).then(() => {
    //             console.log(`copyFile success : ${src}--->${targetSrc}`);
    //         });
    //     }
    // });
    watch.watchTree(sourceDir, { interval: 1 }, function (s, curr, prev) {
        console.log({ curr, prev });
        if (typeof s == 'object' && prev === null && curr === null) {
            // Finished walking the tree
            return;
        }
        else if (prev === null) {
            console.log('new file');
            // f is a new file
        }
        else if (curr.nlink === 0) {
            console.log('remove');
            // f was removed
        }
        else {
            console.log('change', typeof s);
            if (typeof s == 'string') {
                //   test-src\util\test3.js miniprogram test-src ../test-src\util\test3.js test-src\util\test3.js
                // @ts-ignore
                const src = s.split(sep).join('/');
                const { fileName, dirSrc, extName } = usePathInfo(src);
                console.log(`${src} has been changed success :    extName: ${extName} `);
                if (extName == '.vue') {
                    watchVueFile(src);
                }
                else if (extName == '.js') {
                    watchJsFile(src);
                }
                else {
                    const targetSrc = path.join(targetDir, path.relative(sourceDir, src));
                    copyFile(src, targetSrc).then(() => {
                        console.log(`copyFile success : ${src}--->${targetSrc}`);
                    });
                }
            }
            // f was changed
        }
    });
}
if (env.NODE_ENV === 'development') {
    watchSourceAndBuild({ sourceDir: 'test-src', targetDir: 'miniprogram' });
}
