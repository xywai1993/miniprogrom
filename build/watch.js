import watch from 'node-watch';
import path from 'path/posix';
import { watchVueFile, watchJsFile, sourceDir, targetDir } from './main.js';
import { copyFile } from 'fs/promises';
import { usePathInfo } from './util.js';
