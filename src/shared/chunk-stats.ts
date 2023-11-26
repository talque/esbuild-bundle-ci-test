import { Report } from './report';


export class ChunkStats {

    constructor(
        private readonly stats: ReadonlyMap<string, readonly string[]>,
        private readonly missing: readonly string[],
    ) {
    }
    
    static fromReport(
        report: Report,
        files: readonly string[],
    ) {
        const missing: string[] = [];
        const stats = new Map<string, string[]>();
        for (const file of files) {
            const chunk = report.chunk(file);
            if (!chunk) {
                missing.push(file);
                continue;
            }
            for (const parent of report.staticImporters(chunk)) {
                const current = stats.get(parent);
                if (current) {
                    current.push(file);
                } else {
                    stats.set(parent, [file]);
                }
            }
        }
        return new ChunkStats(stats, missing);
    }

    private *orderedIter(): Iterable<readonly [string, readonly string[]]> {
        const chunks = Array.from(this.stats.keys());
        chunks.sort();
        for (const chunk of chunks) {
            const files = this.stats.get(chunk);
            if (!files)
                throw new Error('unreachable');
            yield [chunk, files];
        }
    } 

    get summary(): string {
        const lines: string[] = [];
        for (const [chunk, files] of this.orderedIter())
            lines.push(`There are ${files.length} source file(s) in the chunk ${chunk}`);
        if (this.missing.length > 0)
            lines.push(`Did not find ${this.missing.length} source file(s) in the esbuild output`);
        return lines.join('\n');
    }

    /**
     * Return the list of files that were bundled into the main entry point
     */
    get filesInMain(): readonly string[] {
        return this.stats.get('main.js') ?? [];
    }
   
    /**
     * Return the chunks where more than of the given files is bundled into
     */
    get filesInSameChunk(): ReadonlyArray<readonly [string, readonly string[]]> {
        const result: Array<readonly [string, readonly string[]]> = [];
        for (const [chunk, files] of this.orderedIter())
            if (files.length >= 2)
                result.push([chunk, files]);
        return result;
    }
}
