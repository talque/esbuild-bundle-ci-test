#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_report_1 = require("../src/shared/webpack-report");
function expect(actual, expected) {
    console.log(actual);
    if (actual !== expected)
        throw new Error(`expect mismatch: ${actual} != ${expected}`);
    console.log('Test succeded');
}
console.log('WebpackReport tests start');
const report = new webpack_report_1.WebpackReport('./test/fixtures/report.json');
expect(report.chunk('./projects/feature-libs/map-lib/src/lib/controls/map-controls.event-model.ts'), 'projects_feature-libs_map-lib_src_public-api_routing_ts.js');
expect(report.chunk('./projects/nonexistent-file-name'), undefined);
console.log('WebpackReport tests succeded');
