#!/usr/bin/env node


import { Report } from '../src/shared/report';


function expect(
    actual: string | undefined,
    expected: string | undefined,
) {
    console.log(actual);
    if (actual !== expected)
        throw new Error(`expect mismatch: ${actual} != ${expected}`);
    console.log('Test succeded')
}


console.log('Report tests start')


const report = new Report('./test/fixtures/meta.json');

expect(
    report.chunk('./projects/feature-libs/map-lib/src/lib/models/map-drawer.event-model.ts'),
    'public-api-ZKJ65KCM.js'
)


expect(
    report.chunk('./projects/nonexistent-file-name'),
    undefined,
)

expect(
    report.chunk('./projects/chat-lib/src/lib/blurb/blurb-collection/blurb-collection.component.ts'),
    'chunk-BZYCRPAA.js'
)


if (!report.staticImporters('chunk-BZYCRPAA.js').has('main.js'))
    throw new Error('chunk-BZYCRPAA.js is statically imported by main.js')


console.log('Report tests succeded')
