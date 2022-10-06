"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkStats = void 0;
class ChunkStats {
    constructor(stats, missing) {
        this.stats = stats;
        this.missing = missing;
    }
    static fromReport(report, files) {
        const missing = [];
        const stats = new Map();
        for (const file of files) {
            const chunk = report.chunk(file);
            if (chunk) {
                const current = stats.get(chunk);
                if (current) {
                    current.push(file);
                }
                else {
                    stats.set(chunk, [file]);
                }
            }
            else {
                missing.push(file);
            }
        }
        return new ChunkStats(stats, missing);
    }
    *orderedIter() {
        const chunks = Array.from(this.stats.keys());
        chunks.sort();
        for (const chunk of chunks) {
            const files = this.stats.get(chunk);
            if (!files)
                throw new Error('unreachable');
            yield [chunk, files];
        }
    }
    get summary() {
        const lines = [];
        for (const [chunk, files] of this.orderedIter())
            lines.push(`There are ${files.length} source file(s) in the chunk ${chunk}`);
        if (this.missing.length > 0)
            lines.push(`Did not find ${this.missing.length} source file(s) in the webpack output`);
        return lines.join('\n');
    }
    /**
     * Return the list of files that were bundled into the main entry point
     */
    get filesInMain() {
        return this.stats.get('main.js') ?? [];
    }
    /**
     * Return the chunks where more than of the given files is bundled into
     */
    get filesInSameChunk() {
        const result = [];
        for (const [chunk, files] of this.orderedIter())
            if (files.length >= 2)
                result.push([chunk, files]);
        return result;
    }
}
exports.ChunkStats = ChunkStats;
