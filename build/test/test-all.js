#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function run(command, files) {
    const cmd = [
        '../../build/src/cli.js',
        command,
        'report.json',
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
    './projects/feature-libs/map-lib/src/lib/controls/map-controls.event-model.ts',
], {
    status: 0,
    stderr: [],
    stdout: [
        'There are 1 source file(s) in the chunk projects_feature-libs_map-lib_src_public-api_routing_ts.js',
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
        'Did not find 1 source file(s) in the webpack output',
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
        'There are 3 source file(s) in the chunk main.js',
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
        'There are 2 source file(s) in the chunk main.js',
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
    'projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.component.ts',
], {
    status: 0,
    stderr: [],
    stdout: [
        'There are 1 source file(s) in the chunk main.js',
        'There are 1 source file(s) in the chunk projects_feature-libs_map-lib_src_public-api_routing_ts.js',
        'All source files are in distinct chunks'
    ],
});
/**
 * Test distinct-chunks fail
 */
expect('distinct-chunks', [
    'projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.component.ts',
    'projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.store.ts',
    'projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail.view-model.ts',
], {
    status: 1,
    stderr: [
        '1 chunks were not split'
    ],
    stdout: [
        'There are 3 source file(s) in the chunk projects_feature-libs_map-lib_src_public-api_routing_ts.js',
        'The following chunks bundled multiple files:',
        '  * chunk: projects_feature-libs_map-lib_src_public-api_routing_ts.js',
        '      - projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.component.ts',
        '      - projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail-view.store.ts',
        '      - projects/feature-libs/map-lib/src/lib/map-detail-view/map-detail.view-model.ts'
    ],
});
console.log('All tests succeded');
