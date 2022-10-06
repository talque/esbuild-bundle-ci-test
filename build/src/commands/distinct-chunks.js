"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const chunk_stats_1 = require("../shared/chunk-stats");
const expand_globs_1 = require("../shared/expand-globs");
const report_1 = require("../shared/report");
exports.command = 'distinct-chunks <reportJson> [files...]';
exports.desc = 'Test that the source files were bundled into distinct chunks';
exports.builder = ((yargs) => yargs
    .positional('reportJson', { type: 'string', demandOption: true })
    .positional('files', { type: 'string', demandOption: true }));
const handler = (argv) => {
    const report = new report_1.Report(argv.reportJson);
    const stats = chunk_stats_1.ChunkStats.fromReport(report, (0, expand_globs_1.expandGlobs)(argv.files));
    console.log(stats.summary);
    const multiples = stats.filesInSameChunk;
    if (multiples.length === 0) {
        console.log('All source files are in distinct chunks');
        process.exit(0);
    }
    else {
        console.log('The following chunks bundled multiple files:');
        for (const [chunk, files] of multiples) {
            console.log(`  * chunk: ${chunk}`);
            for (const file of files)
                console.log(`      - ${file}`);
        }
        console.error(`${multiples.length} chunks were not split`);
        process.exit(1);
    }
};
exports.handler = handler;
