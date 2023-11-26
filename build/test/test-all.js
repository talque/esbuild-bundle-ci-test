#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function run(command, files) {
    const cmd = [
        '../../build/src/cli.js',
        command,
        'meta.json',
        ...files,
    ];
    const result = (0, child_process_1.spawnSync)('node', cmd, { cwd: './test/fixtures', stdio: 'pipe' });
    const stdout = result.stdout.toString().split('\n').filter((line) => !!line);
    const stderr = result.stderr.toString().split('\n').filter((line) => !!line);
    const status = result.status;
    if (status === null)
        throw new Error('status is null');
    return { stdout, stderr, status };
}
function expect(command, files, result) {
    const actual = run(command, files);
    console.log(actual);
    if (actual.status !== result.status)
        throw new Error(`status mismatch: ${actual.status} != ${result.status}`);
    if (actual.stdout.join('\n') !== result.stdout.join('\n'))
        throw new Error(`stdout mismatch: "${actual.stdout}" != "${result.stdout}"`);
    if (actual.stderr.join('\n') !== result.stderr.join('\n'))
        throw new Error(`stdout mismatch: "${actual.stderr}" != "${result.stderr}"`);
    console.log('Test succeded');
}
/**
 * Test is-lazy succeeding because file is lazy loaded
 */
expect('is-lazy', [
    './projects/feature-libs/map-lib/src/lib/models/map-drawer.event-model.ts',
], {
    status: 0,
    stderr: [],
    stdout: [
        'There are 1 source file(s) in the chunk public-api-ZKJ65KCM.js',
        'All source files are lazy loaded',
    ],
});
/**
 * Test is-lazy succeeding because file is not bundled
 */
expect('is-lazy', [
    './projects/nonexistent-file-name',
], {
    status: 0,
    stderr: [],
    stdout: [
        'Did not find 1 source file(s) in the esbuild output',
        'All source files are lazy loaded'
    ],
});
/**
 * Test is-lazy failing
 */
expect('is-lazy', [
    'projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.component.ts',
    'projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.view-model.ts',
    'projects/chat-lib/src/lib/blurb/blurb-collection/scroll-trigger-action.ts',
], {
    status: 1,
    stderr: [
        '3 were not lazily loaded',
    ],
    stdout: [
        'There are 3 source file(s) in the chunk chunk-4EZMD2T2.js',
        'There are 3 source file(s) in the chunk chunk-BZYCRPAA.js',
        'There are 3 source file(s) in the chunk chunk-JBGXOPPI.js',
        'There are 3 source file(s) in the chunk chunk-JNTRXSKF.js',
        'There are 3 source file(s) in the chunk chunk-K5RSHVFW.js',
        'There are 3 source file(s) in the chunk chunk-KTHJP424.js',
        'There are 3 source file(s) in the chunk chunk-KTTJKA3D.js',
        'There are 3 source file(s) in the chunk chunk-SKK2LKM6.js',
        'There are 3 source file(s) in the chunk chunk-WKFF5COW.js',
        'There are 3 source file(s) in the chunk main.js',
        'There are 3 source file(s) in the chunk public-api-32WYZAPA.js',
        'There are 3 source file(s) in the chunk public-api-5DAHQFMT.js',
        'There are 3 source file(s) in the chunk public-api-7IANSYND.js',
        'There are 3 source file(s) in the chunk public-api-A6JM6E27.js',
        'There are 3 source file(s) in the chunk public-api-ATYFDBJJ.js',
        'There are 3 source file(s) in the chunk public-api-CW4HCNEQ.js',
        'There are 3 source file(s) in the chunk public-api-EZRST4L4.js',
        'There are 3 source file(s) in the chunk public-api-GYNCO244.js',
        'There are 3 source file(s) in the chunk public-api-JVFWQ7B2.js',
        'There are 3 source file(s) in the chunk public-api-QL464U4Q.js',
        'There are 3 source file(s) in the chunk public-api-QLHR3M6C.js',
        'There are 3 source file(s) in the chunk public-api-SEDZGOLA.js',
        'There are 3 source file(s) in the chunk public-api-TQWGE2I4.js',
        'There are 3 source file(s) in the chunk public-api-UHKTC3TO.js',
        'There are 3 source file(s) in the chunk public-api-XDFYXEHR.js',
        'There are 3 source file(s) in the chunk public-api-XITMG3TI.js',
        'There are 3 source file(s) in the chunk public-api-ZKJ65KCM.js',
        'There are 3 source file(s) in the chunk www.module.ajs-SV7JWNA2.js',
        'There are 3 source file(s) in the chunk www.module.extra.ajs-HEUUWU5K.js',
        'The following files were not lazily loaded:',
        '  * projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.component.ts',
        '  * projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.view-model.ts',
        '  * projects/chat-lib/src/lib/blurb/blurb-collection/scroll-trigger-action.ts'
    ],
});
/**
 * Test glob
 */
expect('is-lazy', [
    'projects/chat-lib/**/blurb-collection/blurb-collection.*',
], {
    status: 1,
    stderr: [
        '2 were not lazily loaded',
    ],
    stdout: [
        'There are 2 source file(s) in the chunk chunk-4EZMD2T2.js',
        'There are 2 source file(s) in the chunk chunk-BZYCRPAA.js',
        'There are 2 source file(s) in the chunk chunk-JBGXOPPI.js',
        'There are 2 source file(s) in the chunk chunk-JNTRXSKF.js',
        'There are 2 source file(s) in the chunk chunk-K5RSHVFW.js',
        'There are 2 source file(s) in the chunk chunk-KTHJP424.js',
        'There are 2 source file(s) in the chunk chunk-KTTJKA3D.js',
        'There are 2 source file(s) in the chunk chunk-SKK2LKM6.js',
        'There are 2 source file(s) in the chunk chunk-WKFF5COW.js',
        'There are 2 source file(s) in the chunk main.js',
        'There are 2 source file(s) in the chunk public-api-32WYZAPA.js',
        'There are 2 source file(s) in the chunk public-api-5DAHQFMT.js',
        'There are 2 source file(s) in the chunk public-api-7IANSYND.js',
        'There are 2 source file(s) in the chunk public-api-A6JM6E27.js',
        'There are 2 source file(s) in the chunk public-api-ATYFDBJJ.js',
        'There are 2 source file(s) in the chunk public-api-CW4HCNEQ.js',
        'There are 2 source file(s) in the chunk public-api-EZRST4L4.js',
        'There are 2 source file(s) in the chunk public-api-GYNCO244.js',
        'There are 2 source file(s) in the chunk public-api-JVFWQ7B2.js',
        'There are 2 source file(s) in the chunk public-api-QL464U4Q.js',
        'There are 2 source file(s) in the chunk public-api-QLHR3M6C.js',
        'There are 2 source file(s) in the chunk public-api-SEDZGOLA.js',
        'There are 2 source file(s) in the chunk public-api-TQWGE2I4.js',
        'There are 2 source file(s) in the chunk public-api-UHKTC3TO.js',
        'There are 2 source file(s) in the chunk public-api-XDFYXEHR.js',
        'There are 2 source file(s) in the chunk public-api-XITMG3TI.js',
        'There are 2 source file(s) in the chunk public-api-ZKJ65KCM.js',
        'There are 2 source file(s) in the chunk www.module.ajs-SV7JWNA2.js',
        'There are 2 source file(s) in the chunk www.module.extra.ajs-HEUUWU5K.js',
        'The following files were not lazily loaded:',
        '  * projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.component.ts',
        '  * projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.view-model.ts',
    ],
});
/**
 * Test distinct-chunks success
 */
expect('distinct-chunks', [
    'projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.component.ts',
    'src/main.ts',
], {
    status: 0,
    stderr: [],
    stdout: [
        'There are 1 source file(s) in the chunk main.js',
        'There are 1 source file(s) in the chunk public-api-ZKJ65KCM.js',
        'All source files are in distinct chunks'
    ],
});
/**
 * Test distinct-chunks fail due to common parent chunk
 */
expect('distinct-chunks', [
    'projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.component.ts',
    'projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.component.ts',
], {
    status: 1,
    stderr: [
        '1 chunks were not split'
    ],
    stdout: [
        'There are 1 source file(s) in the chunk chunk-4EZMD2T2.js',
        'There are 1 source file(s) in the chunk chunk-BZYCRPAA.js',
        'There are 1 source file(s) in the chunk chunk-JBGXOPPI.js',
        'There are 1 source file(s) in the chunk chunk-JNTRXSKF.js',
        'There are 1 source file(s) in the chunk chunk-K5RSHVFW.js',
        'There are 1 source file(s) in the chunk chunk-KTHJP424.js',
        'There are 1 source file(s) in the chunk chunk-KTTJKA3D.js',
        'There are 1 source file(s) in the chunk chunk-SKK2LKM6.js',
        'There are 1 source file(s) in the chunk chunk-WKFF5COW.js',
        'There are 1 source file(s) in the chunk main.js',
        'There are 1 source file(s) in the chunk public-api-32WYZAPA.js',
        'There are 1 source file(s) in the chunk public-api-5DAHQFMT.js',
        'There are 1 source file(s) in the chunk public-api-7IANSYND.js',
        'There are 1 source file(s) in the chunk public-api-A6JM6E27.js',
        'There are 1 source file(s) in the chunk public-api-ATYFDBJJ.js',
        'There are 1 source file(s) in the chunk public-api-CW4HCNEQ.js',
        'There are 1 source file(s) in the chunk public-api-EZRST4L4.js',
        'There are 1 source file(s) in the chunk public-api-GYNCO244.js',
        'There are 1 source file(s) in the chunk public-api-JVFWQ7B2.js',
        'There are 1 source file(s) in the chunk public-api-QL464U4Q.js',
        'There are 1 source file(s) in the chunk public-api-QLHR3M6C.js',
        'There are 1 source file(s) in the chunk public-api-SEDZGOLA.js',
        'There are 1 source file(s) in the chunk public-api-TQWGE2I4.js',
        'There are 1 source file(s) in the chunk public-api-UHKTC3TO.js',
        'There are 1 source file(s) in the chunk public-api-XDFYXEHR.js',
        'There are 1 source file(s) in the chunk public-api-XITMG3TI.js',
        'There are 2 source file(s) in the chunk public-api-ZKJ65KCM.js',
        'There are 1 source file(s) in the chunk www.module.ajs-SV7JWNA2.js',
        'There are 1 source file(s) in the chunk www.module.extra.ajs-HEUUWU5K.js',
        'The following chunks bundled multiple files:',
        '  * chunk: public-api-ZKJ65KCM.js',
        '      - projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.component.ts',
        '      - projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.component.ts'
    ],
});
/**
 * Test distinct-chunks fail
 */
expect('distinct-chunks', [
    'projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.component.ts',
    'projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail.view-model.ts',
], {
    status: 1,
    stderr: [
        '1 chunks were not split'
    ],
    stdout: [
        'There are 2 source file(s) in the chunk public-api-ZKJ65KCM.js',
        'The following chunks bundled multiple files:',
        '  * chunk: public-api-ZKJ65KCM.js',
        '      - projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.component.ts',
        '      - projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail.view-model.ts'
    ],
});
console.log('All tests succeded');
