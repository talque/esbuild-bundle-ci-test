#!/usr/bin/env node


import { WebpackReport } from '../src/shared/webpack-report';


function expect(
    actual: string | undefined,
    expected: string | undefined,
) {
    console.log(actual);
    if (actual !== expected)
        throw new Error(`expect mismatch: ${actual} != ${expected}`);
    console.log('Test succeded')
}


console.log('WebpackReport tests start')


const report = new WebpackReport('./test/fixtures/report.json');

expect(
    report.chunk('./projects/feature-libs/map-lib/src/lib/controls/map-controls.event-model.ts'),
    'projects_feature-libs_map-lib_src_public-api_routing_ts.js'
)


expect(
    report.chunk('./projects/nonexistent-file-name'),
    undefined,
)


console.log('WebpackReport tests succeded')
