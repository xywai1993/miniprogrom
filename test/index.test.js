import { existsSync } from 'fs';
import path from 'path';
import jest from 'jest';
import { writeJsToMiniProgram, useEs6toCommonjs } from '../build/main';

test('test useEs6toCommonjs will be ok', async () => {
    const data = await useEs6toCommonjs(`import {a} from 'b'`);

    expect(data.code).toMatch('require');
});
